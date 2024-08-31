/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";

const ModelContextProvider = createContext({
  model: "llama3-70b-8192",
  setModel: () => null,
});

export function ModelProvider({
  children,
  defaultModel = "llama3-70b-8192",
  storageKey = "vite-ui-model",
  ...props
}) {
  const [model, setModel] = useState(() => {
    return localStorage.getItem(storageKey) || defaultModel;
  });

  const value = {
    model,
    setModel: (model) => {
      localStorage.setItem(storageKey, model);
      setModel(model);
    },
  };

  return (
    <ModelContextProvider.Provider {...props} value={value}>
      {children}
    </ModelContextProvider.Provider>
  );
}

export const useModel = () => {
  const context = useContext(ModelContextProvider);

  if (context === undefined) {
    throw new Error("useModel must be used within a ModelProvider");
  }

  return context;
};
