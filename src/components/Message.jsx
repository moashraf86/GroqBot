/* eslint-disable react/prop-types */
import MDEditor from "@uiw/react-md-editor";
export const Message = ({ content, role, lastMsgRef, index }) => {
  console.log(content, role);

  return (
    <div className={`flex ${role === "user" ? "justify-end" : ""}`}>
      <div
        ref={role === "assistant" && index !== 0 ? lastMsgRef : null}
        className={` ${
          role === "user" ? "bg-muted text-primary rounded-xl mt-10" : ""
        } ${
          role === "assistant"
            ? "flex flex-col gap-4 border-l border-primary/30"
            : ""
        } py-2 px-4 inline-block text-base max-w-full`}
      >
        <MDEditor.Markdown source={content} />
      </div>
    </div>
  );
};
