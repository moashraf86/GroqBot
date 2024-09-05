/* eslint-disable react/prop-types */
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSystemPrompts } from "../context/SystemPromptsProvider";

/**
 * Define the form schema
 */
const schema = z.object({
  // check if the input is not space
  input: z.string().trim().max(1500),
});

export const CustomizationDialog = ({ isOpen, setIsOpen }) => {
  const { systemPrompts, dispatch } = useSystemPrompts();
  const [charCount, setCharCount] = useState(systemPrompts?.length || 0);

  /**
   * Define the initial form values and validation schema
   */
  const form = useForm({
    defaultValues: { input: systemPrompts },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // store valid state of the form
  const isValid = form.formState.isValid;
  // check if the prompts has been changed
  const isPromptsChanged = systemPrompts !== form.getValues("input");

  /**
   * Handle form submission
   */
  const onSubmit = (e) => {
    dispatch({ type: "SEND_PROMPT", payload: e.input });
    localStorage.setItem("systemPrompts", e.input);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle>Customize GroqBot</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h4 htmlFor="instructions" className="text-sm font-medium">
            How would you want GroqBot to respond to you ?
          </h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={5}
                        className="bg-background text-primary p-4 overflow-auto"
                        placeholder="Message GroqBot..."
                        {...field}
                        onInput={(e) => {
                          setCharCount(e.target.value.length);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span
                className={`text-xs ${
                  isValid ? "text-muted-foreground" : "text-destructive"
                } `}
              >
                {charCount}
                /1500
              </span>
              <DialogFooter className="flex-row justify-end gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={!isValid || !isPromptsChanged}
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
