/* eslint-disable react/prop-types */
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

/**
 * Define the form schema
 */
const schema = z.object({
  // check if the input is not space
  input: z.string().trim().min(1, "Message is required"),
});

export const ChatInput = ({ onSend, isGenerating, stopFlag }) => {
  /**
   * Define the initial form values and validation schema
   */
  const form = useForm({
    defaultValues: { input: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  /**
   * Handle form submission
   */
  const onSubmit = (message) => {
    onSend(message.input);
    form.reset();
    // reset the textarea height
    const textarea = document.querySelector("textarea");
    textarea.style.height = "auto";
  };

  /**
   * Handle keydown event
   */
  const handleKeyDown = (e) => {
    // Send message on Enter key press (without shift key) and not on mobile
    const isMobile = window.innerWidth <= 768;
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto bg-background z-50 flex flex-col gap-2 p-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-3 p-2 max-w-3xl mx-auto w-full bg-muted rounded-[1.75rem]"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Textarea
                    className="border-none bg-transparent w-full focus-visible:ring-0 max-h-60 overflow-y-auto"
                    placeholder="Message GroqBot..."
                    {...field}
                    onInput={(e) => {
                      field.onChange(e);
                      const textarea = e.target;
                      textarea.style.height = "auto";
                      textarea.style.height = textarea.scrollHeight + "px";
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {isGenerating ? (
            <Button
              size="icon"
              className="rounded-full p-0 w-10 h-10 disabled:opacity-30 bg-primary text-primary-foreground disabled:pointer-events-none disabled:bg-primary disabled:text-primary-foreground"
              type="button"
              onClick={() => (stopFlag.current = true)}
            >
              <span className="w-3 h-3 bg-primary-foreground"></span>
            </Button>
          ) : (
            <Button
              size="icon"
              className="rounded-full p-0 w-10 h-10 disabled:opacity-30 bg-accent text-accent-foreground disabled:pointer-events-none disabled:bg-primary disabled:text-primary-foreground"
              type="submit"
              disabled={!form.formState.isValid}
            >
              <PaperPlaneIcon />
            </Button>
          )}
        </form>
        {/* Copy right footer */}
      </Form>
      <div className="text-center text-xs text-primary/50">
        © 2024 GroqBot. All rights reserved.
      </div>
    </div>
  );
};
