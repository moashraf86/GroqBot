/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import Groq from "groq-sdk";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const ChatRoom = () => {
  const { model } = useModel();
  const { messages, dispatch } = useMessages();
  const [loading, setLoading] = useState(false);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(null);

  useEffect(() => {
    // scroll to the bottom of the chat box when teh message first loads or updates
    // window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  /**
   * Handle send message to bot
   */
  const handleSend = async (message) => {
    window.scrollTo(0, document.body.scrollHeight); // scroll to the bottom of the chat box

    setCurrentMsgIndex(messages.length + 1); // get the current message index

    dispatch({ type: "SEND_MESSAGE", payload: message }); // Send the message to the bot

    try {
      setLoading(true);
      // check if the user is offline
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
      }
      // create a new conversation with the assistant bot
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
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
      setLoading(false);

      // Get the response iterator from the response object
      const reader = response.iterator();

      let responseMessage = "";

      // Loop through the iterator to get the response message
      for await (const chunk of reader) {
        // Extract the 'delta' object from the chunk
        const { delta } = chunk.choices[0];

        // Check if the delta contains new content
        if (delta.content) {
          // Update the response message if the new content is different
          if (responseMessage !== delta.content) {
            // Set the response message to the new content
            responseMessage = delta.content;

            // Dispatch an action to update the assistant's message in the state
            dispatch({ type: "RECEIVE_MESSAGE", payload: responseMessage });
          }
        }

        // Delay the next chunk by 30 milliseconds to simulate a more human-like typing effect
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    } catch (error) {
      setLoading(false);
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: error.message,
      });
    }
  };

  return (
    <main className="flex flex-col gap-4 container py-4 max-w-3xl">
      <ChatBox
        messages={messages}
        loading={loading}
        currentMsgIndex={currentMsgIndex}
      />
      <ChatInput onSend={handleSend} />
    </main>
  );
};
