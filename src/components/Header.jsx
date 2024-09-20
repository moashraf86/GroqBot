/* eslint-disable react/prop-types */
import { useState } from "react";
import { ThemeToggler } from "./ThemeToggler";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
import { CustomizationDialog } from "./CustomizationDialog";
import { ModelSelectionMenu } from "./ModelSelectionMenu";
export const Header = ({ setIsGenerating }) => {
  const { model, setModel } = useModel();
  const { dispatch } = useMessages();
  const [isOpen, setIsOpen] = useState(false);

  // Clear the chat
  const handleClearChat = () => {
    setIsGenerating(false);
    dispatch({ type: "DELETE_MESSAGES" });
    localStorage.removeItem("conversation");
  };

  return (
    <header className="sticky inset-0 z-50 bg-background py-4 border-b border-border">
      <div className="container md:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase text-primary">
          <span className="text-accent font-open font-black ">{"//"}</span>
          GroqBot
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <ModelSelectionMenu
            model={model}
            setModel={setModel}
            setIsOpen={setIsOpen}
            handleClearChat={handleClearChat}
          />
        </div>
      </div>
      <CustomizationDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
