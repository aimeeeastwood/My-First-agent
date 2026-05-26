import { tool } from 'ai'
import { z } from 'zod'

export const fetchUrlTool = tool({
  description: 'Fetch URL content',

  inputSchema: z.object({
    url: z.string(),
  }),

  execute: async ({ url }) => {
    const res = await fetch(url)
    return await res.text()
  },
})
