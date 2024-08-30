import MDEditor from "@uiw/react-md-editor";
export const Message = ({ content, role }) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : ""}`}>
      <div
        className={` ${
          role === "user" ? "bg-muted text-primary rounded-xl" : ""
        } ${
          role === "bot" ? "flex flex-col gap-4 border-l border-primary/40" : ""
        } py-2 px-3 inline-block text-base max-w-full`}
      >
        <MDEditor.Markdown
          source={content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
};
