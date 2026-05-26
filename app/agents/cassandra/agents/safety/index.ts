export async function run(messages: any[]) {
  const last = messages[messages.length - 1]?.content ?? ''

  if (last.includes('ignore previous') || last.includes('system prompt')) {
    return new Response('Blocked by safety layer', { status: 403 })
  }

  return new Response('OK')
}
