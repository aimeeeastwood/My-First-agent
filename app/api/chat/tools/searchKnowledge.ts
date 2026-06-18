import { tool } from 'ai'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'

function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath)
    }

    if (entry.name.endsWith('.md')) {
      return [fullPath]
    }

    return []
  })
}

export const searchKnowledgeTool = tool({
  description: 'Search Kairos canon knowledge files',

  inputSchema: z.object({
    query: z.string(),
  }),

  execute: async ({ query }) => {
    const knowledgeDir = path.join(process.cwd(), 'knowledge')

    const files = getMarkdownFiles(knowledgeDir)

    const matches = files.filter((file) => {
      const content = fs.readFileSync(file, 'utf8')

      return (
        file.toLowerCase().includes(query.toLowerCase()) ||
        content.toLowerCase().includes(query.toLowerCase())
      )
    })

    return matches
  },
})
