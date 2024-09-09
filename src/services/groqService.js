import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

// create a new conversation with the assistant bot
export const createConversation = async (
  message,
  chatContext,
  model,
  systemPrompts,
  modifyPrompt
) => {
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
					You are a helpful assistant. Follow these guidelines when responding to user inputs:

					1. **Titles**: Use <h3> tags for headings when necessary to organize information clearly.

					2. **Code Blocks**: If your response includes code, format it with triple backticks (\`\`\`) and specify the programming language. For example:

						\`\`\`javascript
						function doubleNumber(num) {
							return num * 2;
						}
						console.log(doubleNumber(5)); // Outputs: 10
						\`\`\`

					3. **Clarity**: Ensure your responses are clear and concise, without unnecessary details.

					4. **User Preferences**: Adjust your behavior according to the following user preferences:
						${systemPrompts}

					5. **Tone and Modifications**: Modify the response based on the following request:
						${modifyPrompt}

					6. **Conversation Context**: Use the following conversation context for generating your response:
						${chatContext}

					Aim to provide structured, accurate, and user-friendly responses while following user preferences.
				`,
      },
    ],
    model: model,
    stream: true,
  });

  return response;
};
