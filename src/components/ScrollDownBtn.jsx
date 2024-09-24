/* eslint-disable react/prop-types */
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export const ScrollDownBtn = () => {
  return (
    <Button
      title="Scroll to bottom"
      size="icon"
      className=" size-10 z-50 p-2 bg-muted border border-border rounded-full cursor-pointer flex items-center justify-center"
      onClick={() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }}
    >
      <ArrowDownIcon className="text-primary size-5" />
    </Button>
  );
};
