// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CommonInput from "../../../components/input/InputField";

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(isLogin ? "Login Data:" : "Register Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4">
      <div className="bg-[#f8f9f9] shadow-lg rounded-2xl flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Form */}
        <div className="flex-1 p-8">
          {/* <h2 className="text-2xl font-bold mb-2">Your Account</h2> */}
          <p className="mb-6 text-black font-bold">
            {isLogin ? "Account" : "Create a new account"}
          </p>

          <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-l-lg font-bold ${
                isLogin ? "bg-[#3aaa35] text-white " : "bg-gray-200"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-r-lg font-bold ${
                !isLogin ? "bg-[#3aaa35] text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CommonInput
              name="email"
              control={control}
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            
            <CommonInput
              name="password"
              control={control}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            {!isLogin && (
              <CommonInput
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                placeholder="Re-enter your password"
                type="password"
              />
            )}

            <button
              type="submit"
              className="w-full border border-[#3aaa35] text-black font-bold py-2 rounded-md mt-4 hover:bg-[#3aaa35] hover:text-white transition"
            >
              {isLogin ? "Log in" : "Register"}
            </button>
          </form>
        </div>

        {/* Right Benefits Section */}
        <div className="flex-1 bg-[#f8f9f9] p-8 border-t md:border-t-0 md:border-l">
          <h3 className="text-lg font-semibold mb-4">Enjoy these benefits</h3>
          <ul className="space-y-2 text-gray-700">
            {[
              "Dedicated personal representative",
              "Fastest delivery in the vape industry",
              "Unbeatable product prices",
              "Supplier of every popular vape product",
              "Easy and fast shopping experience",
              "Back in stock instant notifications",
              "Your own bespoke product catalogue",
            ].map((benefit, i) => (
              <li key={i} className="flex items-center">
                <span className="text-green-500 mr-2">✔</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
