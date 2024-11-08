"use client";

import { SignUpForm } from "@/features/auth/pub/sign-up-form";

export default function SignIn() {
  return (
    <div className="w-full flex justify-center">
      <SignUpForm className="min-w-[300px] max-w-[400px] mt-48" />
    </div>
  );
}
