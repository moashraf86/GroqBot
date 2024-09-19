/* eslint-disable react/prop-types */
import {
  EraserIcon,
  MixerHorizontalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { ThemeToggler } from "./ThemeToggler";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useModel } from "../context/ModelProvider";
import { useMessages } from "../context/MessagesProvider";
import { useState } from "react";
import { CustomizationDialog } from "./CustomizationDialog";
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                title="Menu"
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <PersonIcon width="18" height="18" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[17rem]">
              <DropdownMenuLabel className="uppercase tracking-wide text-xs font-bold text-primary/70">
                Language Models
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                <DropdownMenuRadioItem
                  className="flex flex-col items-start justify-between gap-1 mb-1"
                  value="llama3-70b-8192"
                >
                  <span>llama3-70b</span>
                  <span className="text-xs text-primary/80">
                    Advanced tasks and deep contexts
                  </span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="flex flex-col items-start justify-between gap-1 mb-1"
                  value="gemma2-9b-it"
                >
                  <span>gemma2-9b-it</span>
                  <span className="text-xs text-primary/80">
                    Quick responses and general queries
                  </span>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="flex flex-col items-start justify-between gap-1"
                  value="llama3-groq-70b-8192-tool-use-preview"
                >
                  <span>llama3-groq-70b</span>
                  <span className="text-xs text-primary/80">
                    Multi-step and complex workflows
                  </span>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setIsOpen(true)}>
                  <span className="flex items-center gap-2">
                    <MixerHorizontalIcon width="18" height="18" />
                    Customize GroqBot
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleClearChat}>
                  <span className="flex items-center gap-2">
                    <EraserIcon width="18" height="18" />
                    New Chat
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CustomizationDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
