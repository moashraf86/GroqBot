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
    <header className="sticky inset-0 z-50 bg-background py-4">
      <div className="container md:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase text-primary">
          <span className="text-accent font-open font-black ">//</span>
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
            <DropdownMenuContent className="min-w-[15rem]">
              <DropdownMenuLabel className="uppercase tracking-wide text-xs font-bold text-primary/70">
                Language Models
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                <DropdownMenuRadioItem value="llama3-70b-8192">
                  llama3-70b-8192
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="gemma2-9b-it">
                  gemma2-9b-it
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="llama3-groq-70b-8192-tool-use-preview">
                  llama3-groq-70b-8192
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="mixtral-8x7b-32768">
                  mixtral-8x7b-32768
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
