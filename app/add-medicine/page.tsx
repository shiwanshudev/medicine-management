"use client";

import React, { useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { addMedicine } from "../actions";

export default function AddMedicine() {
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    "medicine-name": z.string().min(2, {
      message: "Medicine name must be at least 2 characters.",
    }),
    notes: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "medicine-name": "",
      notes: "",
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      setIsLoading(true);
      await addMedicine(formData);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto pt-10">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="medicine-name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicine Name</FormLabel>
                <FormControl>
                  <Input placeholder="Vitamin D..." {...field} />
                </FormControl>
                <FormDescription>
                  Please add your medicine here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add instruction or comment for the medicine. Ex: Take with lukewarm water."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <AiOutlineLoading3Quarters className="text-2xl animate-spin mr-1 text-white" />
            )}
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
