/* eslint-disable react/prop-types */
import { useState } from "react";
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
      {
        role: "assistant",
        content: "I'm thinking...",
      },
    ]);

    try {
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
					5. Put titles in <h3> tags.
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
        stream: true,
      });

      /**
       * Read the response message from the iterator
       */
      const reader = response.iterator();
      let responseMessage = "";
      let lastContent = "";
      // loop through the iterator to get the response message
      for await (const chunk of reader) {
        const { delta } = chunk.choices[0];

        // check if the delta has content and if it's different from the last content
        if (delta.content) {
          if (lastContent !== delta.content) {
            responseMessage += delta.content;
            lastContent = delta.content;
          }
        }
        // add the response message to the chat box after each chunk
        setMessages((prev) => [
          ...prev.slice(0, prev.length - 1),
          {
            role: "assistant",
            content: responseMessage,
          },
        ]);

        // delay the next chunk by 1 second to make the chat more human-like
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } catch (error) {
      // add the error message to the chat box
      setMessages([
        ...messages,
        {
          role: "user",
          content: message,
        },
        {
          role: "assistant",
          content: error.message,
        },
      ]);
    }
  };

  return (
    <main className="flex flex-col gap-4 container py-4 max-w-3xl">
      <ChatBox messages={messages} />
      <ChatInput onSend={handleSend} />
    </main>
  );
};
