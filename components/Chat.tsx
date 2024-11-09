'use client'
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

import aianswer from './api/aianswer';
import AiAnswer from './api/aianswer';

interface Message {
  author: 'user' | 'ai';
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { author: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const aiResponse = await getAiResponse(input);
    setMessages((prev) => [...prev, { author: 'ai', text: aiResponse }]);
  };

  const getAiResponse = async (question: string) => {
    /*
    const ans = <AiAnswer prompt={question}></AiAnswer>
    return(
        <>
            {ans}
        </>
    );
    */
    return new Promise<string>((resolve) =>
      setTimeout(() => resolve(`Ответ на: "${question}"`), 1000)
    );
  };

  return (
    <div className="flex flex-col max-w-lg w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col space-y-3 overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.slice(-5).map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.author === 'user'
                ? 'bg-blue-100 self-end'
                : 'bg-gray-100 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4 gap-x-2">
        <Input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Your message" className="flex-grow p-2 border rounded-l-lg" />
        <Button variant="default" className='text-white px-4 py-2 rounded-r-lg' onClick={handleSendMessage}>
            Отправить
        </Button>
      </div>
    </div>
  );
};

export default Chat;
