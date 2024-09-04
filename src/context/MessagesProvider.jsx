/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  // messages initial state
  const messagesInitialState =
    JSON.parse(localStorage.getItem("conversation")) || [];

  // messages reducer function to manage messages state
  const messagesReducer = (state, action) => {
    switch (action.type) {
      case "SEND_MESSAGE":
        return [
          ...state,
          {
            role: "user",
            content: action.payload,
          },
          {
            role: "assistant",
            content: "",
          },
        ];
      case "RECEIVE_MESSAGE":
        return state.map((message, index) =>
          index === state.length - 1 && message.role === "assistant"
            ? { ...message, content: message.content + action.payload }
            : message
        );
      case "DELETE_MESSAGES":
        return [];
      default:
        return state;
    }
  };

  // messages reducer hook
  const [messages, dispatch] = useReducer(
    messagesReducer,
    messagesInitialState
  );

  // sync messages state with local storage
  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(messages));
  }, [messages]);

  return (
    <MessagesContext.Provider value={{ messages, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};

// messages custom hook
export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
