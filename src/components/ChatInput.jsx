/* eslint-disable react/prop-types */
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

/**
 * Define the form schema
 */
const schema = z.object({
  input: z.string().min(1, "Message is required"),
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
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 items-end"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="grow">
              <FormControl>
                <Textarea
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

              <FormMessage />
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
