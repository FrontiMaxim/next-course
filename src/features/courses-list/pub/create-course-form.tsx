"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateListElementCommand } from "../model/type";
import { createCourseAction } from "../actions";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Textarea } from "@/shared/components/ui/textarea";

const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export function CreateCourseForm({
  revalidatePagePath,
  className,
}: {
  revalidatePagePath: string;
  className?: string;
}) {
  const [pingCreateTransition, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: CreateListElementCommand) => {
    startCreateTransition(async () => {
      createCourseAction(revalidatePagePath, data);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="название..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="описание..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={pingCreateTransition} type="submit">
          Добавить
        </Button>
      </form>
    </Form>
  );
}
