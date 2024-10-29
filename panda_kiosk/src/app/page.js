"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Function to handle click and route to Checkout page
  const handleClick = () => {
    router.push('/checkout');
  };

  return (
    <div 
      onClick={handleClick}
      className="flex bg-red-600 items-center justify-center min-h-screen cursor-pointer"
    >
      <div className="w-full md:max-w-prose p-4">
        <h1 className="text-9xl text-white font-extrabold my-8">Order & Pay Here</h1>
        <h2 className="text-5xl text-white font-extrabold my-8">Tap Anywhere To Start!</h2>
        <img src="Panda.jpg" alt="Panda" className="rounded-lg" />
      </div>
    </div>
  );
}
