import { cassandraOrchestrator } from '@/app/agents/cassandra/orchestrator'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    return await cassandraOrchestrator(body.messages)
  } catch (error) {
    console.error(error)

    return new Response('Server error', {
      status: 500,
    })
  }
}
