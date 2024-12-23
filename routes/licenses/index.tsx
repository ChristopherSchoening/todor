import { Handlers, PageProps } from "$fresh/server.ts"
import licenseInfo from "../../libs/data/license-info.json" with {
  type: "json",
}

export interface LicenseRouteProps {
  licenseInfo: unknown
}

export const handler: Handlers<LicenseRouteProps> = {
  GET: (_, ctx) => ctx.render({ licenseInfo }),
}

export default function Licenses(
  { data }: PageProps<LicenseRouteProps>,
) {
  return <div>{JSON.stringify(data.licenseInfo)}</div>
}
