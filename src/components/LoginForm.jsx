"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  // const onSubmit = async (data) => {
  //   try {
  //     console.log("ارسال شد:", data);

  //     const res = await post("", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (!res.ok) {
  //       throw new Error("ورود ناموفق بود");
  //     }

  //     const result = await res.json();
  //     console.log(result);

  //     alert("ورود موفق!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("خطایی رخ داد");
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      console.log("ارسال شد:", data);

      router.push("/test");
    } catch (err) {
      console.error(err);
      alert("خطایی رخ داد");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-center text-[#005792]">
        موسسه یوز ایرانی
      </h1>

      <p className="text-center text-sm my-2 text-[#00bbf0]">
        ورود به حساب کاربری
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <div className="flex flex-col text-right">
          <label className="mb-1 font-medium text-[#005792]">نام کاربری</label>

          <input
            type="text"
            {...register("username", { required: "نام کاربری الزامی است" })}
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#00bbf0]"
            style={{ borderColor: "#00bbf0" }}
            placeholder="نام کاربری"
          />

          {errors.username && (
            <span className="text-red-500 text-xs mt-1">
              {errors.username.message}
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
