import React, { useState } from 'react';
import axios from 'axios';
import '../page/ChatUI.css'; 

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.get('http://localhost:8080/ask-ai-options', {
        params: { prompt: input }
      });

      const aiMessage = { role: 'ai', text: res.data };
      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'ai',
        text: '⚠️ Sorry, something went wrong with the AI server.'
      };
      setMessages([...newMessages, errorMessage]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🔮 AI Chat</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble ai">Typing...</div>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
