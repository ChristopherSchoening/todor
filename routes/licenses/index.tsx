import { Handlers, PageProps } from "$fresh/server.ts"

export interface LicenseRouteProps {
  licenseInfo: string
}

export const handler: Handlers<LicenseRouteProps> = {
  async GET(_, ctx) {
    const url = `${Deno.env.get("API_URL")}/licenses`
    const response = await fetch(url)
    if (!response.ok) {
      return ctx.render({
        licenseInfo: `error ${response.status}, ${
          JSON.stringify(response)
        }, ${url}`,
      })
    }
    const licenseInfo = await response.text()
    console.log("🚀 ~ GET ~ licenseInfo:", licenseInfo)

    return ctx.render({ licenseInfo: JSON.parse(licenseInfo) })
  },
}

export default function Licenses(
  { data }: PageProps<LicenseRouteProps>,
) {
  return <div>{JSON.stringify(data.licenseInfo)}</div>
}
