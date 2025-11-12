import LoginForm from "../../components/LoginForm";
import AuthRedirect from "../../components/AuthRedirect";

export default function LoginPage() {
  return (
    <AuthRedirect>
      <div className="min-h-screen flex items-center justify-center bg-[#00204a] p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-16 space-y-6">
          <LoginForm />
        </div>
      </div>
    </AuthRedirect>
  );
}
