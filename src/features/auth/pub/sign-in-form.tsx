"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInCommand } from "../model/types";
import { cn } from "@/shared/lib/utils";
import { signInAction } from "../actions";
import { toast } from "sonner";

const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function SignInForm({ className }: { className?: string }) {
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInCommand) => {
    toast.promise<string>(
      new Promise((resolve, reject) => {
        signInAction(data).then((result) => {
          if (result.isSignIn) {
            resolve(result.data);
          } else {
            reject(result.data);
          }
        });
      }),
      {
        loading: "Check",
        success: (data) => {
          return data;
        },
        error: (data) => {
          return data;
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} type="email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password..." {...field} type="password" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full mt-5" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
