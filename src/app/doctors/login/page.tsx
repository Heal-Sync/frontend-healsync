import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./doctor-login";

export default function DoctorLoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md p-6 space-y-6 shadow-md rounded-md mt-[-50px] border">
        <div>
          <h3 className="text-xl font-semibold text-center">Doctor Login</h3>
          <p className="text-sm text-center">
            Login to your account to access your dashboard.
          </p>
        </div>
        <Separator />
        <LoginForm />
      </div>
    </div>
  );
}
