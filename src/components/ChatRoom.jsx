/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
import { createConversation } from "../services/groqService";
import { handleChatStream } from "../services/handleChatStream";
import { useSystemPrompts } from "../context/SystemPromptsProvider";
import { IntroSection } from "./IntroSection";

export const ChatRoom = ({ isGenerating, setIsGenerating }) => {
  const { model } = useModel();
  const { messages, dispatch } = useMessages();
  const { systemPrompts } = useSystemPrompts();
  const [loading, setLoading] = useState(false);
  const stopFlag = useRef(false);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(null);
  const [toEditMsg, setToEditMsg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  /**
   * Handle send message to bot
   */
  const handleSend = async (message) => {
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
  const handleRegenerateResponse = async (modifyPrompt) => {
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

  /**
   * Handle the scroll to the bottom of the chat box
   */
  const handleScrollToBottom = () => {
    if (messages.length > 0) {
      if (document.body.scrollHeight > window.innerHeight) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  };

  useEffect(() => {
    // scroll to the bottom of the chat box when teh message first loads or updates
    handleScrollToBottom();
    // store the conversation in the local storage
    localStorage.setItem("conversation", JSON.stringify(messages));
  }, [messages]);

  return (
    <main className="container px-0 flex flex-col flex-grow gap-4 max-w-3xl pt-6">
      {!messages || messages.length === 0 ? (
        <IntroSection setSelectedQuestion={setSelectedQuestion} />
      ) : null}
      {messages && messages.length > 0 && (
        <ChatBox
          messages={messages}
          loading={loading}
          currentMsgIndex={currentMsgIndex}
          isGenerating={isGenerating}
          setIsEditing={setIsEditing}
          setToEditMsg={setToEditMsg}
          onRegenerateResponse={handleRegenerateResponse}
        />
      )}
      <ChatInput
        onSend={handleSend}
        isGenerating={isGenerating}
        stopFlag={stopFlag}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        toEditMsg={toEditMsg}
        selectedQuestion={selectedQuestion}
        setToEditMsg={setToEditMsg}
      />
    </main>
  );
};
