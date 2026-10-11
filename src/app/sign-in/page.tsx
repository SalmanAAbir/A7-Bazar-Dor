import { Suspense } from "react";
import { SignInForm } from "@/components/auth-form";

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
