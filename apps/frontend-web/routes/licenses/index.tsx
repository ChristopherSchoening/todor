import { Handlers, PageProps } from "$fresh/server.ts"

interface Props {
  licenseInfo: string
}

// todo put into api and then remove microservices
export const handler: Handlers<Props> = {
  GET: async (_req, _ctx) => {
    const response = await fetch("http://localhost:8001/license-info")
    const licenseInfo = await response.text()

    return Response.json(JSON.parse(licenseInfo))
  },
}

export default function Licenses(props: PageProps<Props>) {
  return <div>{JSON.stringify(props.data?.licenseInfo)}</div>
}
