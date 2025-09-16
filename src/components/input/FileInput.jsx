"use client";

import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from "react";
import { Button } from "@/components/ui/button";

const FileInput = forwardRef(
  (
    {
      id,
      className,
      name,
      onChange,
      disabled,
      placeholder = "Choose file...",
      ...props
    },
    ref
  ) => {
    const hiddenInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const handleClick = () => {
      if (!disabled) hiddenInputRef.current?.click();
    };

    const handleChange = (e) => {
      const file = e.target.files?.[0] || null;
      setFileName(file ? file.name : "");
      onChange?.({ target: { name, value: file } });
    };

    // expose the hidden input via forwarded ref
    useImperativeHandle(ref, () => hiddenInputRef.current);

    return (
      <div>
        {/* Hidden file input */}
        <input
          id={id}
          name={name}
          type="file"
          ref={hiddenInputRef}
          onChange={handleChange}
          className="hidden"
          {...props}
        />

        {/* Visible button */}
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={handleClick}
          className={`${className} flex h-12 w-full items-center justify-center rounded-[6px] border bg-white/0 p-2 text-sm`}
        >
          {fileName || placeholder}
        </Button>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
export default FileInput;
