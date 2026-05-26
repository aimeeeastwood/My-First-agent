import { streamText, convertToModelMessages } from 'ai'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { createOpenAI } from '@ai-sdk/openai'

import { readFileTool } from './tools/readFile'
import { calculatorTool } from './tools/calculator'
import { fetchUrlTool } from './tools/fetchUrl'

const permissions = {
  canReadFiles: false,
  canWriteFiles: false,
  canUseShell: false,
  canUseNetwork: true,
}

const local = createOpenAI({
  baseURL: 'http://172.24.240.1:1234/v1',
  apiKey: 'lm-studio',
})

function checkPermission(permission: keyof typeof permissions) {
  if (!permissions[permission]) {
    throw new Error(`Permission denied: ${permission}`)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const messages = body?.messages
    const model = body?.model

    if (!Array.isArray(messages)) {
      throw new Error('messages must be an array')
    }

    let selectedModel

    switch (model) {
      case 'claude':
        selectedModel = anthropic('claude-3-5-sonnet-latest')
        break
      case 'gpt':
        selectedModel = openai('gpt-4o-mini')
        break
      case 'gemini':
        selectedModel = google('gemini-2.5-flash')
        break
      case 'local':
        selectedModel = local('qwen/qwen3.5-9b')
        break
      default:
        selectedModel = google('gemini-2.5-flash')
    }

    const convertedMessages = messages
      .map((m: any) => {
        const content = Array.isArray(m.parts)
          ? m.parts
              .filter(
                (p: any) => p?.type === 'text' && typeof p?.text === 'string',
              )
              .map((p: any) => p.text)
              .join('')
          : typeof m?.content === 'string'
            ? m.content
            : ''

        return {
          role: m.role,
          content,
        }
      })
      .filter(
        (m: any) =>
          (m.role === 'user' || m.role === 'assistant') &&
          m.content.trim().length > 0,
      )

    const result = streamText({
      model: selectedModel,
      messages: convertedMessages,
      tools: {
        readFile: readFileTool,
        calculator: calculatorTool,
        fetchUrl: fetchUrlTool,
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('FULL ERROR:', error)
    return new Response('Server error', { status: 500 })
  }
}
