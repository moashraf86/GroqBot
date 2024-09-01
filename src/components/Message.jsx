/* eslint-disable react/prop-types */
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
export const Message = ({ content, role }) => {
  console.log(content, role);

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
        <div className="flex ass">
          <div className="flex flex-col gap-4 border-l border-primary/30 py-2 pl-5 pr-4 text-base max-w-full">
            <MDEditor.Markdown source={content} />
          </div>
        </div>
      )}
    </>
  );
};
