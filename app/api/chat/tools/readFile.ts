import { tool } from 'ai'
import { z } from 'zod'
import fs from 'fs'

export const readFileTool = tool({
  description: 'Read a local file',

  inputSchema: z.object({
    filePath: z.string(),
  }),

  execute: async ({ filePath }) => {
    return fs.readFileSync(filePath, 'utf-8')
  },
})
