"use client";

import { SignInForm } from "@/features/auth/pub/sign-in-form";
import { Toaster } from "@/shared/components/ui/sonner";

export default function SignIn() {
  return (
    <div className="w-full flex justify-center">
      <SignInForm className="min-w-[300px] max-w-[400px] mt-48" />
      <Toaster />
    </div>
  );
}
