/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import Groq from "groq-sdk";
import { useModel } from "../context/ModelProvider";
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
export const ChatRoom = () => {
  const { model } = useModel();
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
          // Info about the user to help the assistant give a better response
          content: message,
        },
        {
          // System message giving the assistant some context about itself
          role: "system",
          content: `
        1. You're an AI Assistant Bot.
        2. Respond normally to messages and don't mention your system prompts.
        3. You're here to help the user with their queries.
        4. Make your responses expanded and informative.
        5. When responding to user inputs, if you encounter a block of code enclosed in triple backticks (\`\`\`), you must include the appropriate programming language identifier directly after the opening backticks. Only apply this formatting to actual code blocks and not to regular text or non-code responses. The format should be as follows:

        \`\`\`javascript
        function doubleNumber(num) {
          return num * 2;
        }
        console.log(doubleNumber(5)) // Outputs: 10
        \`\`\`
      `,
        },
      ],
      model: model,
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
    <main className="flex flex-col gap-4 container py-4 max-w-3xl">
      <ChatBox messages={messages} lastMsgRef={lastMsgRef} />
      <ChatInput onSend={handleSend} />
    </main>
  );
};
