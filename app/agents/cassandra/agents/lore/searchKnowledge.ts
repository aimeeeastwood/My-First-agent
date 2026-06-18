import fs from 'fs'
import path from 'path'

export function searchKnowledge(query: string): string[] {
  const base = path.join(process.cwd(), 'knowledge')

  const files = fs.readdirSync(base, { recursive: true }) as string[]

  return files
    .filter((f) => typeof f === 'string' && f.endsWith('.md'))
    .filter((f) => {
      const content = fs.readFileSync(path.join(base, f), 'utf-8')
      return content.toLowerCase().includes(query.toLowerCase())
    })
    .map((f) => path.join('knowledge', f))
}
