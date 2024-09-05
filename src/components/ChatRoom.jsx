/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
import { createConversation } from "../services/groqService";
import { handleChatStream } from "../services/handleChatStream";
import { useSystemPrompts } from "../context/SystemPromptsProvider";

export const ChatRoom = () => {
  const { model } = useModel();
  const { messages, dispatch } = useMessages();
  const { systemPrompts } = useSystemPrompts();
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const stopFlag = useRef(false);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(null);

  useEffect(() => {
    // scroll to the bottom of the chat box when teh message first loads or updates
    window.scrollTo(0, document.body.scrollHeight);
    // store the conversation in the local storage
    localStorage.setItem("conversation", JSON.stringify(messages));
  }, [messages, isGenerating]);

  // let stopFlagFn = () => stopFlag;
  /**
   * Handle send message to bot
   */
  const handleSend = async (message) => {
    setIsGenerating(true);
    stopFlag.current = false;
    // scroll to the bottom of the chat box
    window.scrollTo(0, document.body.scrollHeight);

    setCurrentMsgIndex(messages.length + 1); // get the current message index

    dispatch({ type: "SEND_MESSAGE", payload: message }); // Send the message to the bot

    try {
      setLoading(true);

      // check if the user is offline
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
      }

      // create a new conversation with the assistant bot
      const response = await createConversation(message, model, systemPrompts);

      setLoading(false);

      // Handle the chat stream
      // if the user hits the stop button, stop generating the response
      await handleChatStream(response, dispatch, () => stopFlag.current);
    } catch (error) {
      setLoading(false);
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: error.message,
      });
    } finally {
      // setCurrentMsgIndex(null);
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex flex-col gap-4 container py-4 max-w-3xl">
      <ChatBox
        messages={messages}
        loading={loading}
        currentMsgIndex={currentMsgIndex}
        isGenerating={isGenerating}
      />
      <ChatInput
        onSend={handleSend}
        isGenerating={isGenerating}
        stopFlag={stopFlag}
      />
    </main>
  );
};
