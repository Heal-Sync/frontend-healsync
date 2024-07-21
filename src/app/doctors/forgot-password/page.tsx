import { Separator } from "@/components/ui/separator";
import { ForgotPasswordForm } from "./forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-6 space-y-6 shadow-md rounded-md mt-[-50px] border">
        <div>
          <h3 className="text-xl font-semibold text-center">Forgot Password</h3>
          <p className="text-sm text-center">
            Enter your email to receive a one-time password.
          </p>
        </div>
        <Separator />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
