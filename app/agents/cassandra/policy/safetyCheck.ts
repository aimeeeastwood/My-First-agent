export function safetyCheck(messages: any[]): boolean {
  const lastMessage = messages[messages.length - 1]

  const last =
    typeof lastMessage === 'string' ? lastMessage : (lastMessage?.content ?? '')

  return !(last.includes('ignore previous') || last.includes('system prompt'))
}
