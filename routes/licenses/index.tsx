import { Handlers, PageProps } from "$fresh/server.ts"

export interface LicenseRouteProps {
  licenseInfo: string
}

export const handler: Handlers<LicenseRouteProps> = {
  async GET(_, ctx) {
    const url = `${new URL(ctx.url).origin}/api/licenses`
    console.log("🚀 ~ GET ~ url:", url)
    const response = await fetch(url)
    const licenseInfo = await response.text()

    return ctx.render({ licenseInfo: JSON.parse(licenseInfo) })
  },
}

export default function Licenses(
  { data }: PageProps<LicenseRouteProps>,
) {
  return <div>{JSON.stringify(data.licenseInfo)}</div>
}
