import { Application, Router } from "oak"
import licenseInfo from "./license-info.json" with { type: "json" }

const PORT = Deno.env.get("ENV") === "production" ? 8000 : 8001

const router = new Router()

router.get("/license-info", (context) => {
	context.response.headers.set("Content-Type", "application/json")
	context.response.headers.set("Access-Control-Allow-Origin", "*")
	context.response.body = licenseInfo
})

// todo generate openapi spec and visualize it
router.get("/openapi", (context) => {
	context.response.body = "Welcome to the API!"
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

console.log(`HTTP webserver running. Access it at: http://localhost:${PORT}/`)
await app.listen({ port: PORT })
