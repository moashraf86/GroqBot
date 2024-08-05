/* eslint-disable react/prop-types */
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useRef } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
export const Message = ({ content, role }) => {
  const buttonRef = useRef(null);

  /**
   * Copy code block to clipboard
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(buttonRef.current.nextSibling.innerText);
    // change the button text for 2s only
    buttonRef.current.querySelector(".copy").classList.add("hidden");
    buttonRef.current.querySelector(".copied").classList.remove("hidden");
    buttonRef.current.querySelector(".copied").classList.add("flex");

    setTimeout(() => {
      buttonRef.current.querySelector(".copy").classList.remove("hidden");
      buttonRef.current.querySelector(".copied").classList.add("hidden");
      buttonRef.current.querySelector(".copied").classList.remove("flex");
    }, 2000);
  };
  return (
    <div className={`flex ${role === "user" ? "justify-end" : ""}`}>
      {/* bot avatar */}
      <div
        className={` ${
          role === "user" ? "bg-muted text-primary rounded-xl" : ""
        } ${
          role === "bot" ? "flex flex-col gap-4 border-l border-primary/40" : ""
        } py-2 px-3 inline-block text-base`}
      >
        {
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: ({ node, ...props }) => {
                return (
                  <pre {...props}>
                    <button
                      title="Copy code"
                      ref={buttonRef}
                      onClick={handleCopy}
                      className="absolute top-4 right-4 px-3 py-1.5 md:bg-background rounded-full text-sm text-primary cursor-pointer"
                    >
                      <span className="copy flex gap-2 items-center justify-center">
                        <CopyIcon className="w-4 h-4" />
                        <span className="hidden md:inline">copy code</span>
                      </span>

                      <span className="copied hidden gap-2 items-center justify-center">
                        <CheckIcon className="w-4 h-4" />
                        <span className="hidden md:inline">copied</span>
                      </span>
                    </button>
                    {props.children}
                  </pre>
                );
              },
            }}
          >
            {content}
          </Markdown>
        }
      </div>
    </div>
  );
};
