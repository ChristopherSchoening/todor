import { Handlers } from "$fresh/server.ts"
import licenseInfo from "./license-info.json" with { type: "json" }
import type { LicenseRouteProps } from "../../licenses/index.tsx"

export const handler: Handlers<{ licenseText: LicenseRouteProps }> = {
  GET: async (req) => {
    console.log("API request received:", req.url)
    return Response.json(licenseInfo, {
      headers: { "Content-Type": "application/json" },
    })
  },
}
