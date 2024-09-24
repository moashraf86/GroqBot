/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
import { useSystemPrompts } from "../context/SystemPromptsProvider";
import { IntroSection } from "./IntroSection";
import { handleRegenerate, handleSend } from "../services/chatHandlers";

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
  const [isUserAtBottom, setIsUserAtBottom] = useState(false);
  /**
   * Handle send message to bot
   */
  const sendMessage = (message) => {
    handleSend({
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
    });
  };

  /**
   * Handle regenerate response
   */
  const regenerateResponse = (modifyPrompt) => {
    handleRegenerate({
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
    });
  };

  /**
   * Handle scroll event
   * check if the user is at the bottom of the chat box
   */
  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.body.offsetHeight - 50
    ) {
      setIsUserAtBottom(true);
    } else {
      setIsUserAtBottom(false);
    }
  };

  /**
   * Handle the scroll to the bottom of the chat box
   */
  const handleScrollToBottom = () => {
    if (isUserAtBottom) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  // add a scroll event listener to the chat container
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  useEffect(() => {
    // scroll to the bottom of the chat box when teh message first loads or updates
    handleScrollToBottom();
    // store the conversation in the local storage
    localStorage.setItem("conversation", JSON.stringify(messages));
  }, [messages]);

  return (
    <main className="px-0 flex flex-col flex-grow gap-4 pt-6">
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
          onRegenerateResponse={regenerateResponse}
        />
      )}
      <ChatInput
        onSend={sendMessage}
        isGenerating={isGenerating}
        stopFlag={stopFlag}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        toEditMsg={toEditMsg}
        selectedQuestion={selectedQuestion}
        setToEditMsg={setToEditMsg}
        isUserAtBottom={isUserAtBottom}
      />
    </main>
  );
};
