"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  //

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        const serverMessage =
          (result && (result.message || result.error)) || "ورود ناموفق بود";
        toast.error(serverMessage);
        return;
      }

      if (result && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        toast.success("ورود موفق! در حال هدایت...");

        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        toast.error("اطلاعات ورود نادرست است");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا در اتصال به سرور. دوباره تلاش کنید.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6" dir="rtl">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-3xl font-bold text-center text-[#005792]">
        موسسه یوز ایرانی
      </h1>

      <p className="text-center text-sm my-2 text-[#00bbf0]">
        ورود به حساب کاربری
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div className="flex flex-col text-right">
          <label className="mb-1 font-medium text-[#005792]">ایمیل</label>
          <input
            type="email"
            {...register("email", { required: "ایمیل الزامی است" })}
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#00bbf0]"
            style={{ borderColor: "#00bbf0" }}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col text-right">
          <label className="mb-1 font-medium text-[#005792]">رمز عبور</label>
          <input
            type="password"
            {...register("password", { required: "رمز عبور الزامی است" })}
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#00bbf0]"
            style={{ borderColor: "#00bbf0" }}
            placeholder="••••••••"
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full p-3 text-white mt-3 font-bold rounded-xl transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#fdb44b" }}
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
