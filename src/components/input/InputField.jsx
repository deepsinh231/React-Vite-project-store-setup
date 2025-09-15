// src/components/CommonInput.jsx
import React from "react";
import { useController } from "react-hook-form";

const CommonInput = ({ name, control, label, placeholder, type = "text" }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default CommonInput;
