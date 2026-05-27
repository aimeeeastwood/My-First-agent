export function safetyCheck(messages: any[]): boolean {
  const last = messages[messages.length - 1]?.content ?? ''

  return !(last.includes('ignore previous') || last.includes('system prompt'))
}
