import { getAllProjects } from "./util/get-all-projects.ts"
import _ from "lodash"
const { uniqBy } = _

const licenseCache = new Map<string, string>()
const allProjects = getAllProjects()
const allDeps =
	(await Promise.all(allProjects.flatMap(getDependenciesOfProject))).flat()
const allLicenses = await Promise.all<
	Dependency & { licenseText: string | null }
>(
	uniqBy(
		allDeps.filter((dep) => dep.url != null),
		(dep: Dependency) => dep.name,
	).map(async (dep: Dependency) => ({
		...dep,
		licenseText: await getLicenseText(dep.url!.toString()),
	})),
)
const licenseInfo = JSON.stringify(
	allLicenses.filter((license) => license.licenseText != null),
)
console.log(licenseInfo)

interface Dependency {
	name: string
	url: URL | string | undefined
}

interface DenoInfoOutput {
	modules: {
		specifier: string
		dependencies: { code: { specifier: string } }[]
	}[]
}

async function getDependenciesOfProject(
	project: string,
): Promise<Dependency[]> {
	const { code, stderr, stdout } = await new Deno.Command(
		`deno`,
		{
			args: ["info", "--json", Deno.cwd() + project],
			stdout: "piped",
			stderr: "piped",
		},
	).output()
	if (code !== 0) {
		const output = new TextDecoder().decode(stderr)
		console.error(output)
	}
	const output: DenoInfoOutput = JSON.parse(new TextDecoder().decode(stdout))

	const dependencies: Dependency[] = [
		...new Set(
			output.modules.map((module) => module.specifier),
		),
	]
		.map(
			(specifier) => ({
				name: specifier,
				url: new URL(specifier),
			}),
		)
		.filter((dependency) =>
			dependency.url.origin != null && dependency.url.origin !== "null" &&
			!dependency.url.origin.includes("undefined")
		)
		.map((dependency) => ({
			...dependency,
			url: `${dependency.url.origin}${
				dependency.url.pathname.match(
					/^(?<name>[/][\s\S]+@v?\d+[.]\d+[.]\d+[/])/,
				)?.groups?.name
			}LICENSE`,
		}))

	return dependencies
}

async function getLicenseText(url: string): Promise<string | null> {
	if (licenseCache.has(url)) {
		return licenseCache.get(url)!
	}

	try {
		const response = await fetch(new URL(url))
		if (!response.ok) {
			throw new Error(`failed to fetch license for url: ${url}`)
		}
		const responseText = await response.text()
		const license = responseText
		licenseCache.set(url, license)
		return license
	} catch (_error) {
		// console.error(error)
		return null
	}
}
