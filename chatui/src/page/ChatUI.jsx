import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import '../page/ChatUI.css';
import axios from '../axios.jsx';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Replace this with your actual API call
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-app-container">
      <div className="chat-window">
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="header-icon">
              <Sparkles className="sparkles-icon" />
            </div>
            <h1 className="header-title">AI Assistant</h1>
          </div>
          <div className="header-overlay"></div>
        </div>

        {/* Messages Container */}
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className={`avatar ${msg.role}-avatar`}>
                {msg.role === 'user' ? (
                  <User className="avatar-icon" />
                ) : (
                  <Bot className="avatar-icon" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`message-bubble ${msg.role}-bubble`}>
                <p className="message-text">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="message-wrapper ai-message">
              <div className="avatar ai-avatar">
                <Bot className="avatar-icon" />
              </div>
              <div className="message-bubble ai-bubble loading-bubble">
                <div className="loading-content">
                  <div className="typing-dots">
                    <div className="dot dot-1"></div>
                    <div className="dot dot-2"></div>
                    <div className="dot dot-3"></div>
                  </div>
                  <span className="loading-text">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="message-input"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || input.trim() === ''}
              className={`send-button ${
                loading || input.trim() === '' ? 'disabled' : 'enabled'
              }`}
            >
              <Send className="send-icon" />
            </button>
          </div>
          <p className="input-hint">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;