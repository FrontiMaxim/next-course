"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpCommand } from "../model/types";
import { cn } from "@/shared/lib/utils";
import getBrowserFingerprint from "get-browser-fingerprint";
import { signUpAction } from "../actions";
import { redirect } from "next/navigation";
import { useState } from "react";

const signUpFormSchema = z.object({
  name: z.string().min(6, "Insufficient number of characters").trim(),
  email: z.string().email("Invalid mail format").trim(),
  password: z.string().min(6, "Insufficient number of characters").trim(),
});

export function SignUpForm({ className }: { className?: string }) {
  const [isErrorSignUp, setIsErrorSignUp] = useState(false);
  const [textErrorSignUp, setTextErrorSignUp] = useState("");

  const form = useForm<SignUpCommand>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors, isValid },
  } = form;

  const onSubmit = async (data: SignUpCommand) => {
    if (isValid) {
      const fingerprint = await getBrowserFingerprint();

      const result = await signUpAction(data, fingerprint);
      console.log(result);

      if (result.isSignUp) {
        console.log(result);
      } else {
        setIsErrorSignUp(true);
        setTextErrorSignUp(result.data);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="At least 6 characters"
                  {...field}
                  type="name"
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example" {...field} type="email" />
              </FormControl>
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
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
                <Input
                  placeholder="At least 6 characters"
                  {...field}
                  type="password"
                />
              </FormControl>
              {errors.password && (
                <FormMessage>{errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button className="w-full mt-8" type="submit">
          Sign Up
        </Button>
        {isErrorSignUp && (
          <FormMessage className="text-center mt-5">
            {textErrorSignUp}
          </FormMessage>
        )}
      </form>
    </Form>
  );
}
