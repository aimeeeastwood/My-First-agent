import { cassandraOrchestrator } from '@/app/agents/cassandra/orchestrator'

export async function POST(req: Request) {
  const body = await req.json()

  const result = await cassandraOrchestrator(body.messages)

  return Response.json(result)
}
