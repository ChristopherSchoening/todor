import { Handlers } from "$fresh/server.ts"
import licenseInfo from "./license-info.json" with { type: "json" }
import type { LicenseRouteProps } from "../../licenses/index.tsx"

export const handler: Handlers<{ licenseText: LicenseRouteProps }> = {
  GET: async () =>
    Response.json(licenseInfo, {
      headers: { "Content-Type": "application/json" },
    }),
}
