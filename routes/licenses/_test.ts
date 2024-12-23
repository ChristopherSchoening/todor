import { createHandler, ServeHandlerInfo } from "$fresh/server.ts"
import { expect } from "jsr:@std/expect"
import config from "../../fresh.config.ts"
import manifest from "../../fresh.gen.ts"

const CONN_INFO: ServeHandlerInfo = {
  remoteAddr: { hostname: "127.0.0.1", port: 53496, transport: "tcp" },
  completed: Promise.resolve(),
}

Deno.test("get licenses", async () => {
  const handler = await createHandler(manifest, config)

  const resp = await handler(
    new Request("http://127.0.0.1/api/licenses"),
    CONN_INFO,
  )
  const responseContent = await resp.json()

  expect(resp.status).toEqual(200)
  expect(responseContent.length).toBeGreaterThan(0)
})
