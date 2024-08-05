/* eslint-disable react/prop-types */
import { Message } from "./Message";

export const ChatBox = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 grow pb-16">
      {messages.map((message, index) => (
        <Message key={index} {...message} />
      ))}
    </div>
  );
};
