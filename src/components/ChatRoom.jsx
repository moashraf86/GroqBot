/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
export const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const lastMsgRef = useRef(null);

  /**
   * Scroll to the last message of the chat box
   */
  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Handle send message to bot
   */
  const handleSend = async (message) => {
    // write user message to the chat box first before getting the response
    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);
    // send the message to the bot and get the response
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          // info about the user to help the assistant give a better response
          content: message,
        },
        {
          // system message give the assistant some context about himself
          role: "system",
          content:
            "1. You're a front-end developer. 2. When encountering code blocks in the text, ensure that the appropriate programming language name is added after the opening backticks (e.g., ```javascript) for proper markdown syntax highlighting. 3. If any titles are present, wrap them in <h3> tags to format them as headers.",
        },
      ],
      model: "llama3-70b-8192",
    });
    // add the response to the messages
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
  };

  return (
    <div className="h-full flex flex-col gap-4 container py-4 max-w-3xl">
      <ChatBox messages={messages} lastMsgRef={lastMsgRef} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};
