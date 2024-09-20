/* eslint-disable react/prop-types */
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export const ScrollDownBtn = ({ chatContainerRef }) => {
  return (
    <Button
      title="Scroll to bottom"
      size="icon"
      className="fixed size-10 z-50 bottom-28 left-1/2 -translate-x-9 p-2 bg-muted border border-border rounded-full cursor-pointer flex items-center justify-center"
      onClick={() => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }}
    >
      <ArrowDownIcon className="text-primary size-5" />
    </Button>
  );
};
