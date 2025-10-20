/* eslint-disable react/prop-types */
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
import {
  EraserIcon,
  MixerHorizontalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
export const ModelSelectionMenu = ({
  model,
  setModel,
  setIsOpen,
  handleClearChat,
}) => {
  return (
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
            value="llama-3.3-70b-versatile"
          >
            <span>Llama 3.3 70B</span>
            <span className="text-xs text-primary/80">
              Advanced tasks and deep contexts
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex flex-col items-start justify-between gap-1"
            value="openai/gpt-oss-120b"
          >
            <span>GPT OSS 120B</span>
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
  );
};
