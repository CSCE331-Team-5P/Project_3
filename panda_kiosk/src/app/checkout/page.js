import Image from "next/image";

export default function Checkout() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full md:max-w-prose p-4">
        <h1 className="text-9xl font-extrabold my-8">Order & Pay Here</h1>
        <h2 className="text-5xl font-extrabold my-8">Tap Anywhere To Start!</h2>
        <img src="Panda.jpg" alt="Panda" className="rounded-lg" />
      </div>
    </div>
  );
}