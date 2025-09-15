"use client";

import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";

const TextInput = forwardRef(
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
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
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
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
