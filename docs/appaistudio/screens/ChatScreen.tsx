import React, { useState } from 'react';
import Header from '../components/Header';
import { SendIcon } from '../components/icons/Icons';
import { MOCK_USER } from '../constants';

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Olá! Contrato aceito. Por favor, envie os dados do passageiro para a emissão.', sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header title={`Chat com ${MOCK_USER.name}`} onBack={onBack} />
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              msg.sender === 'me'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
            }`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite os dados do passageiro..."
            className="flex-grow bg-transparent text-gray-900 dark:text-white px-2 focus:outline-none"
          />
          <button onClick={handleSend} className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-500 transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;