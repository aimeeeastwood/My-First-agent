'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'

export default function Page() {
  const { messages, sendMessage, status } = useChat()

  const [input, setInput] = useState('')
  const [model, setModel] = useState('gemini')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    await sendMessage({ text: input })

    setInput('')
  }

  return (
    <div
      style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif' }}
    >
      <h1>Chatbot</h1>

      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        style={{ marginBottom: 16, padding: 8 }}
      >
        <option value="gemini">Gemini</option>
        <option value="claude">Claude</option>
        <option value="gpt">GPT</option>
        <option value="local">Local (LM Studio)</option>
      </select>

      <div
        style={{
          border: '1px solid #ddd',
          padding: 16,
          minHeight: 300,
          marginBottom: 16,
        }}
      >
        {messages.map((message, i) => (
          <div key={`${message.id}-${i}`} style={{ marginBottom: 12 }}>
            <strong>{message.role}:</strong>{' '}
            {message.parts?.map((part, j) =>
              part.type === 'text' ? <span key={j}>{part.text}</span> : null,
            )}
          </div>
        ))}

        {status === 'streaming' && <p>Typing...</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          style={{ flex: 1, padding: 8 }}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  )
}
