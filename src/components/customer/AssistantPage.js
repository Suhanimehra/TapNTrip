import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const voiceCommands = [
  'Book a flight',
  'Find hotels nearby',
  'Get directions',
  'Emergency help',
  'Translate text',
];

const AssistantPage = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, 'assistantChats', user.uid, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, [user.uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    const db = getFirestore();
    await addDoc(collection(db, 'assistantChats', user.uid, 'messages'), {
      sender: 'user',
      text,
      createdAt: Timestamp.now(),
    });
    // Simulate bot reply
    setTimeout(async () => {
      await addDoc(collection(db, 'assistantChats', user.uid, 'messages'), {
        sender: 'bot',
        text: "I'm your travel assistant. How can I help you today?",
        createdAt: Timestamp.now(),
      });
      setLoading(false);
    }, 1000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI Travel Assistant</h2>
      <div className="mb-6 flex gap-2">
        <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg hover:from-red-600 hover:to-orange-600 transition">Emergency Call</button>
        <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition">Support Call</button>
      </div>
      <div className="bg-black/30 rounded-xl p-4 min-h-[250px] max-h-[300px] overflow-y-auto flex flex-col mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
            <div className={`px-4 py-2 rounded-xl max-w-[70%] ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-gray-800 text-gray-200'}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2 mb-4">
        <input
          className="flex-1 rounded-xl p-3 bg-gray-800 text-white border border-blue-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition" disabled={loading || !input.trim()}>&#9658;</button>
      </form>
      <div className="bg-black/30 rounded-xl p-4">
        <h3 className="font-semibold mb-2">Voice Commands</h3>
        <ul className="list-disc list-inside text-sm text-gray-300">
          {voiceCommands.map((cmd, idx) => (
            <li key={idx} className="mb-1">"{cmd}"</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssistantPage; 