/* eslint-disable react/prop-types */
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Skeleton } from "./ui/skeleton";
export const Message = ({ content, role, loading }) => {
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
        <div className="flex">
          <div className="flex flex-col gap-4 border-l py-2 pl-5 pr-4 text-base min-w-full max-w-full border-primary/30">
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-3/4 h-3" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            ) : (
              <MDEditor.Markdown source={content} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
