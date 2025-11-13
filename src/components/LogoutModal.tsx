"use client";

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-xl p-10 w-96 shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-6">آیا می‌خواهید خارج شوید؟</h2>
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={onConfirm}
            className="bg-[#fdb44b] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            بله
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}
