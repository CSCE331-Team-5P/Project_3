"use client";

import Image from "next/image";

import { LoginForm } from "@/components/login-form";

//^ Importing the useRouter hook from Next.js
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  //^ Function to handle click and route to Checkout page
  const handleSuccessfulLogin = () => {
    router.push('/home');
  };

  return (
    <div className="flex flex-row bg-red-700 h-screen overflow-hidden p-10">
      <div className="grow flex items-center justify-center">
        <Image
          src="/panda.svg"
          alt="Panda Express Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col bg-white rounded-3xl justify-center h-full align-middle w-5/12 m-auto text-center">
        <h1 className="text-6xl text-black font-extrabold my-2">Panda Express</h1>
        <h2 className="text-4xl text-black font-extrabold mt-2 mb-10">Management System</h2>
        <LoginForm onSuccessfulLogin={handleSuccessfulLogin}/>
      </div>
    </div>
  );
}