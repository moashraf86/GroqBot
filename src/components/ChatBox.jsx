/* eslint-disable react/prop-types */
import { Message } from "./Message";

export const ChatBox = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 grow pb-24">
      {messages.map((message, index) => (
        <Message key={index} {...message} index={index} />
      ))}
    </div>
  );
};
