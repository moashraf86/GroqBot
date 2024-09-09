/* eslint-disable react/prop-types */
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import {
  CopyIcon,
  MixerHorizontalIcon,
  Pencil1Icon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export const Message = ({
  content,
  role,
  loading,
  isGenerating,
  lastResponse,
  lastMessage,
  setIsEditing,
  setToEditMsg,
  onRegenerateResponse,
}) => {
  /**
   * Handle edit message
   */
  const handleEditMessage = (message) => {
    setIsEditing(true);
    setToEditMsg(message);
  };

  /**
   * Copy message to clipboard on button click
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      {role === "user" ? (
        <div className="flex max-w-lg self-end group">
          <Button
            onClick={() => handleEditMessage(content)}
            variant="ghost"
            size="icon"
            className={` min-w-10 ${
              !lastMessage && "opacity-0"
            } mr-2 rounded-full group-hover:opacity-100 `}
          >
            <Pencil1Icon width={18} height={18} />
          </Button>

          <div className="bg-muted text-primary rounded-xl py-2 px-4 inline-block text-base max-w-full whitespace-pre-wrap">
            {content}
          </div>
        </div>
      ) : (
        // Assistant message
        <div className="grid gap-4 group">
          <div className="flex flex-col gap-4 py-1 pr-4 text-base min-w-full max-w-full">
            {loading ? (
              <div className="flex flex-col gap-2 border-l border-primary/30 pl-4">
                <Skeleton className="w-3/4 h-3" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            ) : (
              <div className="border-l border-primary/30 pl-4">
                <MDEditor.Markdown source={content} />
              </div>
            )}
          </div>
          {/* Response Toolbar */}
          {!lastResponse ? (
            <div className="opacity-0 group-hover:opacity-100 flex gap-2">
              <Button
                title="Copy"
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={copyToClipboard}
              >
                <CopyIcon className="inline-block text-primary/70 size-[18px]" />
              </Button>
            </div>
          ) : (
            <div
              className={`flex gap-2 ${
                content && !isGenerating ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={copyToClipboard}
              >
                <CopyIcon className="inline-block text-primary/70 size-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() => onRegenerateResponse()}
              >
                <UpdateIcon className="inline-block text-primary/70 size-[18px]" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MixerHorizontalIcon className="inline-block text-primary/70 size-[18px]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel className="uppercase tracking-wide text-xs font-bold text-primary/70">
                    Modify Response
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    onValueChange={(value) => onRegenerateResponse(value)}
                  >
                    <DropdownMenuRadioItem
                      className="flex items-center gap-2"
                      value="Make the response shorter by removing unnecessary information, focusing only on key points."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                      </svg>
                      Shorter
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex items-center gap-2"
                      value="Expand the response by adding more details, explanations, or examples."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                      Longer
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex items-center gap-2"
                      value="Simplify the response by using clear, basic language and avoiding technical jargon."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                      </svg>
                      Simpler
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex items-center gap-2"
                      value="Adjust the tone to be more casual, conversational, and relaxed."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                      </svg>
                      More Casual
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex items-center gap-2"
                      value="Make the tone more professional, formal, and suitable for business or official communication."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                      More Professional
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      )}
    </>
  );
};
