import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

// create a new conversation with the assistant bot
export const createConversation = async (message, model) => {
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

  return response;
};
