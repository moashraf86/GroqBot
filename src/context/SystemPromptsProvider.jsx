/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const SystemPromptsContext = createContext();

export const SystemPromptsProvider = ({ children }) => {
  // System Prompts initial state
  const systemPromptsInitialState =
    localStorage.getItem("systemPrompts") === "null"
      ? ""
      : localStorage.getItem("systemPrompts");

  // System Prompts Reducer
  const systemPromptsReducer = (state, action) => {
    switch (action.type) {
      case "SEND_PROMPT":
        return action.payload;
      default:
        return state;
    }
  };

  // System Prompts Reducer Hook
  const [systemPrompts, dispatch] = useReducer(
    systemPromptsReducer,
    systemPromptsInitialState
  );

  // sync the system prompts with the local storage
  useEffect(() => {
    localStorage.setItem("systemPrompts", systemPrompts);
  }, [systemPrompts]);

  return (
    <SystemPromptsContext.Provider
      value={{
        systemPrompts,
        dispatch,
      }}
    >
      {children}
    </SystemPromptsContext.Provider>
  );
};

// System Prompts Custom Hook
export const useSystemPrompts = () => {
  const context = useContext(SystemPromptsContext);
  if (!context) {
    throw new Error(
      "useSystemPrompts must be used within a SystemPromptsProvider"
    );
  }
  return context;
};
