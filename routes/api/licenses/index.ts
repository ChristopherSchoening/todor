import { Handlers } from "$fresh/server.ts"
import licenseInfo from "../../.././libs/data/license-info.json" with {
  type: "json",
}
import type { LicenseRouteProps } from "../../licenses/index.tsx"

export const handler: Handlers<{ licenseText: LicenseRouteProps }> = {
  GET: () =>
    Response.json(licenseInfo, {
      headers: { "Content-Type": "application/json" },
    }),
}
