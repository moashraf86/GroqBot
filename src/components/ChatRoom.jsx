/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
import { useSystemPrompts } from "../context/SystemPromptsProvider";
import { IntroSection } from "./IntroSection";
import { ScrollDownBtn } from "./ScrollDownBtn";
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

  // track whether the user is at the bottom of the chat box or not
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);
  const chatContainerRef = useRef(null);

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
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      // check if the user is at the bottom of the chat box
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setIsUserAtBottom(true);
      } else {
        setIsUserAtBottom(false);
      }
    }
  };

  /**
   * Handle the scroll to the bottom of the chat box
   */
  const handleScrollToBottom = () => {
    if (chatContainerRef.current && isUserAtBottom) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // add a scroll event listener to the chat container
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // scroll to the bottom of the chat box when teh message first loads or updates
    handleScrollToBottom();
    // store the conversation in the local storage
    localStorage.setItem("conversation", JSON.stringify(messages));
  }, [messages]);

  return (
    <main
      ref={chatContainerRef}
      className="px-0 flex flex-col flex-grow gap-4 pt-6 scroll-smooth overflow-y-auto max-h-[92dvh]"
    >
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
      />
      {!isUserAtBottom &&
      chatContainerRef.current.scrollHeight >
        chatContainerRef.current.clientHeight ? (
        <ScrollDownBtn chatContainerRef={chatContainerRef} />
      ) : null}
    </main>
  );
};
