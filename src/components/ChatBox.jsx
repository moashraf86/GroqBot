/* eslint-disable react/prop-types */
import { Message } from "./Message";

export const ChatBox = ({ messages, loading, currentMsgIndex }) => {
  return (
    <div className="flex flex-col gap-8 grow pb-24">
      {messages.map((message, index) => (
        <Message
          key={index}
          {...message}
          loading={loading && index === currentMsgIndex}
        />
      ))}
    </div>
  );
};
