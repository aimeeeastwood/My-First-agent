import { cassandraOrchestrator } from '@/app/agents/cassandra/orchestrator'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body?.messages || !Array.isArray(body.messages)) {
      return new Response('Invalid messages payload', { status: 400 })
    }

    return await cassandraOrchestrator(body.messages)
  } catch (error) {
    console.error(error)

    return new Response('Server error', {
      status: 500,
    })
  }
}
