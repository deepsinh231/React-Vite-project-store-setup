"use client";

import React, { forwardRef, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input } from "@/components/ui/input";

const PasswordInput = forwardRef(
  (
    {
      id,
      name,
      placeholder,
      value,
      defaultValue,
      onChange,
      disabled,
      state,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <Input
          id={id}
          name={name}
          ref={ref}
          className={`flex h-12 w-full items-center justify-center rounded-[6px] border bg-white/0 p-3 text-sm outline-none ${
            disabled
              ? "!border-none !bg-gray-100 dark:!bg-white/5"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500"
              : state === "success"
              ? "border-black text-black placeholder:text-black"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
          placeholder={placeholder}
          type={show ? "text" : "password"}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          {...props}
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => setShow((s) => !s)}
        >
          {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
