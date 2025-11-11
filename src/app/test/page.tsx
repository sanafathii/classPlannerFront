import Image from "next/image";
import srcImg from "../../../public/images/Untitled.jpg";

export default function CenteredImage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      <div className="relative w-3/4 max-w-md sm:w-1/2">
        <h1 className="font-bold text-2xl">Welcome Home!</h1>
        <Image
          src={srcImg}
          alt="عکس نمونه"
          width={400}
          height={400}
          className="object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
