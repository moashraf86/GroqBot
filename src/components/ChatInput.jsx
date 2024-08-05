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

export const ChatInput = ({ onSend }) => {
  /**
   * Define the initial form values and validation schema
   */
  const form = useForm({
    defaultValues: { input: "" },
    resolver: zodResolver(schema),
  });

  /**
   * Handle form submission
   */
  const onSubmit = (message) => {
    onSend(message.input);
    form.reset();
    // navigate to the bottom of the chat
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 items-end fixed bottom-0 left-0 right-0 p-4 bg-background max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Textarea
                  className="bg-primary-foreground"
                  placeholder="Message GroqBot..."
                  {...field}
                  onInput={(e) => {
                    field.onChange(e);
                    const textarea = e.target;
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <PaperPlaneIcon />
        </Button>
      </form>
    </Form>
  );
};
