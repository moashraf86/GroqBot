/* eslint-disable react/prop-types */
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";

/**
 * Define the form schema
 */
const schema = z.object({
  // check if the input is not space
  input: z.string().trim().min(1, "Message is required"),
});

export const ChatInput = ({
  onSend,
  isGenerating,
  stopFlag,
  toEditMsg,
  isEditing,
  setToEditMsg,
  setIsEditing,
  selectedQuestion,
}) => {
  const textareaRef = useRef(null);

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
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  /**
   * Handle form input
   */
  const handleFormInput = (e) => {
    form.setValue("input", e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    // clear ToEditMsg when the user starts typing
    setToEditMsg(null);
    setIsEditing(false);
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

  /**
   * Sync input values with toEditMsg
   */
  useEffect(() => {
    if (toEditMsg && isEditing) {
      form.setValue("input", toEditMsg); // set the input value to the toEditMsg
      form.trigger("input"); // trigger the validation
    }
    // resize the textarea to fit the content & apply focus
    const Timer = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, 0);
    // set Selected Question
    if (selectedQuestion) {
      form.setValue("input", selectedQuestion);
      form.trigger("input");
    }
    // clean up
    return () => clearTimeout(Timer);
  }, [toEditMsg, isEditing, selectedQuestion]);

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background z-50 flex flex-col gap-2 py-3 px-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-3 p-2 mx-auto w-full bg-muted rounded-[1.75rem] max-w-3xl"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="grow grow-wrap">
                <FormControl ref={textareaRef}>
                  <Textarea
                    className="border-none bg-transparent w-full focus-visible:ring-0 max-h-40 overflow-y-auto"
                    placeholder="Message GroqBot..."
                    {...field}
                    onInput={(e) => handleFormInput(e)}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {isGenerating ? (
            <Button
              title="Stop"
              size="icon"
              className="rounded-full p-0 w-10 h-10 disabled:opacity-30 bg-primary text-primary-foreground disabled:pointer-events-none disabled:bg-primary disabled:text-primary-foreground"
              type="button"
              onClick={() => (stopFlag.current = true)}
            >
              <span className="w-3 h-3 bg-primary-foreground"></span>
            </Button>
          ) : (
            <Button
              title="Send"
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
