/* eslint-disable react/prop-types */
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
export const Message = ({ content, role }) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : ""}`}>
      {/* bot avatar */}

      {role === "bot" && (
        <div className="flex items-center justify-center w-6 h-6 p-5 bg-muted rounded-full mt-2">
          GB
        </div>
      )}
      <div
        className={` ${role === "user" ? "bg-muted text-primary" : ""} ${
          role === "bot" ? "flex flex-col gap-4" : ""
        } py-2 px-3 rounded-xl inline-block text-base`}
      >
        {
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </Markdown>
        }
      </div>
    </div>
  );
};
