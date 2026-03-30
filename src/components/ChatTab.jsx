import { useState, useRef, useEffect } from 'react'

export default function ChatTab() {
  const [messages, setMessages] = useState([])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server error: ${res.status}`)
      }
      const { reply } = await res.json()
      setMessages([...nextMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fade-in" style={containerStyle}>
      <div style={chatAreaStyle}>
        {messages.length === 0 && !loading && (
          <div style={emptyStateStyle}>
            <p style={{ color: '#7c3aed', fontSize: '24px', marginBottom: '8px' }}>⬡</p>
            <p style={{ color: '#475569', fontSize: '13px', fontFamily: "'IBM Plex Mono', monospace" }}>
              Ask anything about your peptide stack.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={bubbleWrapStyle(msg.role)}>
            <div style={labelStyle(msg.role)}>
              {msg.role === 'user' ? 'You' : 'Claude'}
            </div>
            <div style={bubbleStyle(msg.role)}>
              {msg.content.split('\n').map((line, j) => (
                <span key={j}>{line}{j < msg.content.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div style={bubbleWrapStyle('assistant')}>
            <div style={labelStyle('assistant')}>Claude</div>
            <div style={{ ...bubbleStyle('assistant'), color: '#475569' }}>
              <TypingDots />
            </div>
          </div>
        )}

        {error && (
          <p style={{ color: '#f87171', fontSize: '13px', fontFamily: "'IBM Plex Mono', monospace", padding: '0 4px' }}>
            Error: {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <div style={inputRowStyle}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your stack... (Enter to send, Shift+Enter for newline)"
          rows={2}
          style={textareaStyle}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={sendButtonStyle(loading || !input.trim())}
        >
          Send
        </button>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#7c3aed',
            display: 'inline-block',
            animation: `typingBounce 1s infinite ${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  )
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '600px',
}

const chatAreaStyle = {
  flex: 1,
  overflowY: 'auto',
  padding: '8px 0 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}

const emptyStateStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '60px 0',
}

const bubbleWrapStyle = (role) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: role === 'user' ? 'flex-end' : 'flex-start',
})

const labelStyle = (role) => ({
  fontSize: '11px',
  fontFamily: "'IBM Plex Mono', monospace",
  color: '#475569',
  marginBottom: '4px',
  letterSpacing: '0.05em',
})

const bubbleStyle = (role) => ({
  maxWidth: '75%',
  background: role === 'user' ? '#1e1640' : '#0f0f1a',
  border: `1px solid ${role === 'user' ? '#3b2d8a' : '#1e1e35'}`,
  borderRadius: role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
  padding: '12px 14px',
  color: '#e2e8f0',
  fontSize: '14px',
  fontFamily: "'Space Grotesk', sans-serif",
  lineHeight: '1.6',
})

const inputRowStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'flex-end',
  borderTop: '1px solid #1e1e35',
  paddingTop: '12px',
}

const textareaStyle = {
  flex: 1,
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  lineHeight: '1.5',
  padding: '10px 12px',
  resize: 'none',
  outline: 'none',
}

const sendButtonStyle = (disabled) => ({
  background: disabled ? '#1e1e35' : '#7c3aed',
  border: 'none',
  borderRadius: '8px',
  color: disabled ? '#475569' : '#e2e8f0',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  padding: '10px 20px',
  transition: 'background 0.2s',
  whiteSpace: 'nowrap',
})
