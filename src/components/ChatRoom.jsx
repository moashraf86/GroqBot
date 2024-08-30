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
    // send the message of the user to the bot
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `I'm a backend developer. I'm working on a project and I need some help with the following: ${message}`,
        },
        {
          role: "system",
          content:
            "1.you're a front-end developer. 2.add language- prefix to pre and code tags classes",
        },
      ],
      model: "llama3-70b-8192",
    });
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        content: response.choices[0].message.content,
      },
    ]);
    // navigate to the bottom of the chat
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="h-full flex flex-col gap-4 container py-4 max-w-3xl">
      <ChatBox messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};
