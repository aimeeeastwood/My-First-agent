import { tool } from 'ai'
import { z } from 'zod'

export const calculatorTool = tool({
  description: 'Evaluate math expression',

  inputSchema: z.object({
    expression: z.string(),
  }),

  execute: async ({ expression }) => {
    return String(eval(expression))
  },
})
