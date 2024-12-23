import { Handlers, PageProps } from "$fresh/server.ts"

export interface LicenseRouteProps {
  licenseInfo: string
}

export const handler: Handlers<LicenseRouteProps> = {
  async GET(_, ctx) {
    // todo url in env
    const response = await fetch("http://localhost:8000/api/licenses/")
    const licenseInfo = await response.text()
    return ctx.render({ licenseInfo: JSON.parse(licenseInfo) })
  },
}

export default function Licenses(
  { data }: PageProps<LicenseRouteProps>,
) {
  return <div>{JSON.stringify(data.licenseInfo)}</div>
}
