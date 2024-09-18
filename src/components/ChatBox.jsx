/* eslint-disable react/prop-types */
import { Message } from "./Message";

export const ChatBox = ({
  messages,
  loading,
  currentMsgIndex,
  isGenerating,
  setIsEditing,
  setToEditMsg,
  onRegenerateResponse,
}) => {
  return (
    <div className="flex flex-col gap-8 grow pb-4 px-4">
      {messages.map((message, index) => (
        <Message
          key={index}
          index={index}
          {...message}
          loading={loading && index === currentMsgIndex}
          lastMessage={index === messages.length - 2}
          lastResponse={index === messages.length - 1}
          isGenerating={isGenerating}
          setIsEditing={setIsEditing}
          setToEditMsg={setToEditMsg}
          onRegenerateResponse={onRegenerateResponse}
        />
      ))}
    </div>
  );
};
