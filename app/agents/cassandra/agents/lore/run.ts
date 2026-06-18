import fs from 'fs'
import path from 'path'
import { streamText } from 'ai'
import { searchKnowledge } from './searchKnowledge'

function loadFiles(files: string[]) {
  return files
    .slice(0, 3)
    .map((file) => fs.readFileSync(path.join(process.cwd(), file), 'utf-8'))
    .join('\n\n---\n\n')
}

export async function runLore(messages: any[], model: any) {
  const last = messages[messages.length - 1]?.content ?? ''

  const files = searchKnowledge(last)

  const context =
    files.length > 0
      ? loadFiles(files)
      : 'NO CANON MATCH FOUND — MUST RESPOND UNKNOWN IN CANON'

  return streamText({
    model,
    messages: [
      {
        role: 'system',
        content: `
YOU ARE A STRICT KAIROS CANON ENGINE.

RULES:
- Only use provided knowledge base
- Never invent aircraft, factions, or events
- If missing → say "UNKNOWN IN CANON"

--- CANON CONTEXT START ---
${context}
--- CANON CONTEXT END ---
        `,
      },
      ...messages,
    ],
  }).toUIMessageStreamResponse()
}
