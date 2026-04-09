import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css';

function Messages({ currentUserId }) {
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInbox();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId]);

  const fetchInbox = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/messages/inbox', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data);
    } catch(err) {
      console.error('Error fetching inbox:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/messages/conversation/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch(err) {
      console.error('Error fetching conversation:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          receiverId: selectedUserId,
          content: messageInput,
          listingId: null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessageInput('');
      fetchConversation();
    } catch(err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="messages-container">
      <div className="messages-wrapper">
        <div className="conversations-list">
          <h2>Messages</h2>
          {conversations.length > 0 ? (
            <ul>
              {conversations.map(conv => (
                <li key={conv._id} className={selectedUserId === conv._id ? 'active' : ''}>
                  <button onClick={() => setSelectedUserId(conv._id)}>
                    <div className="conv-avatar">
                      {conv.profileImage ? (
                        <img src={conv.profileImage} alt={conv.name} />
                      ) : (
                        <i className="fas fa-user"></i>
                      )}
                    </div>
                    <div className="conv-info">
                      <strong>{conv.name}</strong>
                      <p>Click to view conversation</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-messages">No conversations yet</p>
          )}
        </div>

        <div className="chat-area">
          {selectedUserId ? (
            <>
              <div className="chat-header">
                <h3>Conversation</h3>
              </div>
              <div className="messages-list">
                {messages.map(msg => (
                  <div key={msg._id} className={`message ${msg.sender._id === currentUserId ? 'sent' : 'received'}`}>
                    <div className="message-avatar">
                      {msg.sender.profileImage ? (
                        <img src={msg.sender.profileImage} alt={msg.sender.name} />
                      ) : (
                        <i className="fas fa-user"></i>
                      )}
                    </div>
                    <div className="message-content">
                      <strong>{msg.sender.name}</strong>
                      <p>{msg.content}</p>
                      <small>{new Date(msg.createdAt).toLocaleString()}</small>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="message-form">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit" className="btn-primary">Send</button>
              </form>
            </>
          ) : (
            <div className="no-conversation">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
