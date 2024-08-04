/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
export const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  /**
   * Handle send message to bot
   */
  const handleSend = async (message) => {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
    });
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
      },
      {
        role: "bot",
        content: response.choices[0].message.content,
      },
    ]);
  };

  return (
    <div className="h-full flex flex-col gap-4 container py-4 max-w-5xl">
      <ChatBox messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};
