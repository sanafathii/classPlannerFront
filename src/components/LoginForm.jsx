export default function LoginForm() {
  return (
    <div className="w-full max-w-sm mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold text-center text-[#005792]">
        موسسه یوز ایرانی
      </h1>

      <p className="text-center text-sm my-2 text-[#00bbf0]">
        ورود به حساب کاربری
      </p>

      <form className="space-y-4 mt-6">
        <div className="flex flex-col text-right">
          <label className="mb-1 font-medium text-[#005792]">نام کاربری</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#00bbf0]"
            style={{ borderColor: "#00bbf0" }}
            placeholder="نام کاربری"
          />
        </div>

        <div className="flex flex-col text-right">
          <label className="mb-1 font-medium text-[#005792]">رمز عبور</label>
          <input
            type="password"
            className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#00bbf0]"
            style={{ borderColor: "#00bbf0" }}
            placeholder="••••••••"
          />
        </div>

        <button
          className="w-full p-3 text-white mt-3 font-bold rounded-xl transition hover:opacity-90"
          style={{ backgroundColor: "#fdb44b" }}
        >
          ورود
        </button>
      </form>
    </div>
  );
}
