console.log('Claude key exists:', !!process.env.ANTHROPIC_API_KEY)
console.log('Claude key preview:', process.env.ANTHROPIC_API_KEY?.slice(0, 10))

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'

const providers = {
  gemini: google('gemini-2.5-flash'),
  claude: anthropic('claude-3-5-sonnet-20241022'),
  gpt: openai('gpt-4o-mini'),
}

// ---------- Eval helpers ----------

function isOnTopic(prompt, response) {
  const keywords = prompt
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 4)

  const text = response.toLowerCase()

  return keywords.some((word) => text.includes(word))
}

function isValidJSON(text) {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

function isConcise(text, maxWords = 60) {
  return text.trim().split(/\s+/).length <= maxWords
}

// ---------- Test cases ----------

const tests = [
  {
    name: 'Concise factual answer',
    prompt: 'Explain photosynthesis in under 40 words.',
    json: false,
  },
  {
    name: 'Structured JSON output',
    prompt:
      'Return ONLY valid JSON with keys name, role, and skill for a pirate captain.',
    json: true,
  },
  {
    name: 'Short practical answer',
    prompt: 'Give three tips for staying focused while coding.',
    json: false,
  },
]

// ---------- Runner ----------

async function runEval(providerName, model, test) {
  const { text } = await generateText({
    model,
    prompt: test.prompt,
  })

  const result = {
    provider: providerName,
    test: test.name,
    output: text,
    onTopic: isOnTopic(test.prompt, text),
    concise: isConcise(text),
    validJSON: test.json ? isValidJSON(text) : 'n/a',
  }

  return result
}

// ---------- Main ----------

async function main() {
  for (const test of tests) {
    console.log('\n=================================================')
    console.log(`TEST: ${test.name}`)
    console.log(`PROMPT: ${test.prompt}`)
    console.log('=================================================\n')

    for (const [name, model] of Object.entries(providers)) {
      try {
        const result = await runEval(name, model, test)

        console.log(`--- ${name.toUpperCase()} ---`)
        console.log(result.output)
        console.log('\nScores:')
        console.log(`On Topic:   ${result.onTopic ? 'PASS' : 'FAIL'}`)
        console.log(`Concise:    ${result.concise ? 'PASS' : 'FAIL'}`)

        if (test.json) {
          console.log(`Valid JSON: ${result.validJSON ? 'PASS' : 'FAIL'}`)
        }

        console.log('\n')
      } catch (err) {
        console.log(`--- ${name.toUpperCase()} FAILED ---`)
        console.log(err.message)
        console.log('\n')
      }
    }
  }
}

main()
