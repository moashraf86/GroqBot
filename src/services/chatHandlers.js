import { createConversation } from "./groqService";
import { handleChatStream } from "./handleChatStream";

/**
 * Handle send message to bot
 */
export const handleSend = async ({
  message,
  setIsGenerating,
  stopFlag,
  handleScrollToBottom,
  messages,
  dispatch,
  setLoading,
  model,
  systemPrompts,
  setIsEditing,
  setToEditMsg,
  setCurrentMsgIndex,
  setSelectedQuestion,
}) => {
  // set isGenerating to true
  setIsGenerating(true);

  // set stopFlag to false
  stopFlag.current = false;

  // scroll to the bottom of the chat box
  handleScrollToBottom();

  // set currentMsgIndex to messages.length + 1
  setCurrentMsgIndex(messages.length + 1);

  // dispatch the message to the bot
  dispatch({ type: "SEND_MESSAGE", payload: message });

  // Get the chat context from the previous messages
  const chatContext = messages.map((msg) => msg.content).join("\n");

  try {
    // set loading to true
    setLoading(true);

    // check if the user is offline
    if (!navigator.onLine) {
      throw new Error("No internet connection. Please check your network.");
    }

    // create a new conversation with the assistant bot
    const response = await createConversation(
      message,
      chatContext,
      model,
      systemPrompts
    );

    // set loading to false
    setLoading(false);

    // Handle the chat stream
    await handleChatStream(response, dispatch, () => stopFlag.current);
  } catch (error) {
    // set loading to false
    setLoading(false);

    // receive the error message
    dispatch({
      type: "RECEIVE_MESSAGE",
      payload: error.message,
    });
  } finally {
    setIsGenerating(false);
    setIsEditing(false);
    setToEditMsg(null);
    setCurrentMsgIndex(null);
    setSelectedQuestion(null);
  }
};

/**
 * Handle regenerate response
 */
export const handleRegenerate = async ({
  modifyPrompt,
  messages,
  dispatch,
  setIsGenerating,
  stopFlag,
  setCurrentMsgIndex,
  setIsEditing,
  setToEditMsg,
  setSelectedQuestion,
  model,
  setLoading,
  systemPrompts,
}) => {
  // Get the last user message
  const lastUserMessage = messages[messages.length - 2].content;

  // Delete the last pair of messages (user and assistant)
  dispatch({ type: "DELETE_LAST_PAIR_MESSAGES" });

  // Set isGenerating to true
  setIsGenerating(true);

  // Set stopFlag to false
  stopFlag.current = false;

  // Set currentMsgIndex to messages.length
  setCurrentMsgIndex(messages.length - 1);

  // Dispatch the message to the bot
  dispatch({ type: "SEND_MESSAGE", payload: lastUserMessage });

  // Get the chat context from the previous messages
  const chatContext = messages.map((msg) => msg.content).join("\n");

  try {
    // set loading to true
    setLoading(true);
    // check if the user is offline
    if (!navigator.onLine) {
      throw new Error("No internet connection. Please check your network.");
    }

    // create a new conversation with the assistant bot
    const response = await createConversation(
      lastUserMessage,
      chatContext,
      model,
      systemPrompts,
      modifyPrompt
    );

    // set loading to false
    setLoading(false);

    // Handle the chat stream
    await handleChatStream(response, dispatch, () => stopFlag.current);
  } catch (error) {
    // set loading to false
    setLoading(false);
    // receive the error message
    dispatch({
      type: "RECEIVE_MESSAGE",
      payload: error.message,
    });
  } finally {
    setIsGenerating(false);
    setIsEditing(false);
    setToEditMsg(null);
    setCurrentMsgIndex(null);
    setSelectedQuestion(null);
  }
};
