export const handleChatStream = async (response, dispatch, stopFlagFn) => {
  // Get the response iterator from the response object
  const reader = response.iterator();

  let responseMessage = "";

  // Loop through the iterator to get the response message
  for await (const chunk of reader) {
    // Stop Generating if the user hits the stop button
    if (stopFlagFn()) {
      break;
    }
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

      // Delay the next chunk by 30 milliseconds to simulate a more human-like typing effect
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  }
};
