/* eslint-disable react/prop-types */
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { CopyIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";
export const Message = ({ content, role, loading, isGenerating, lastMsg }) => {
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
            variant="ghost"
            size="icon"
            className=" min-w-10 opacity-0 mr-2 rounded-full group-hover:opacity-100"
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
          {!lastMsg ? (
            <div className="opacity-0 group-hover:opacity-100 flex gap-2">
              <Button
                title="Copy"
                variant="ghost"
                size="icon"
                className="w-7 h-7"
                onClick={copyToClipboard}
              >
                <CopyIcon
                  width={16}
                  height={16}
                  className="inline-block text-primary/70"
                />
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
                className="w-7 h-7"
                onClick={copyToClipboard}
              >
                <CopyIcon
                  width={16}
                  height={16}
                  className="inline-block text-primary/70"
                />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
