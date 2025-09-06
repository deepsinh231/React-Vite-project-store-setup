// import React, { useId, useState } from "react";
// import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// import { Input } from "@/components/ui/input";
// import { TfiLocationPin } from "react-icons/tfi";
// const InputField = React.forwardRef(function InputField(
//   {
//     label,
//     type = "text",
//     extra,
//     placeholder,
//     variant,
//     state,
//     disabled,
//     onClickIcon,
//     stateError,
//     ...props
//   },
//   ref
// ) {
//   const id = useId();
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const isPassword = type === "password";
//   return (
//     <div className={`${extra}`}>
//       <div className="flex items-center justify-between">
//         <label
//           htmlFor={id}
//           className={`text-sm text-navy-700 dark:text-white ${
//             variant === "auth" ? "ml-1.5 font-medium" : "ml-1 font-bold"
//           }`}
//         >
//           {label}
//         </label>
//         {onClickIcon && (
//           <div
//             className="flex cursor-pointer items-center gap-0"
//             onClick={onClickIcon}
//           >
//             <span className="text-gray-400 hover:text-gray-600">
//               Current Location
//             </span>
//             <TfiLocationPin className="text-xl" />
//           </div>
//         )}
//       </div>
//       <div className="relative mt-2">
//         <Input
//           className={`flex h-12 w-full items-center justify-center rounded-[6px] border bg-white/0 p-3 text-sm outline-none ${
//             disabled
//               ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
//               : state === "error"
//               ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
//               : state === "success"
//               ? "border-black text-black placeholder:text-black dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
//               : "border-gray-200 dark:!border-white/10 dark:text-white"
//           }`}
//           placeholder={placeholder}
//           type={isPassword && showPassword ? "text" : type}
//           ref={ref}
//           disabled={disabled}
//           {...props}
//           id={id}
//         />
//         {isPassword && (
//           <span
//             className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//           </span>
//         )}
//       </div>
//       {stateError && (
//         <p className="mt-1 text-xs font-medium text-red-500">{stateError}</p>
//       )}
//     </div>
//   );
// });
// export default InputField;
"use client";

import React, {
  useId,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { TfiLocationPin } from "react-icons/tfi";
import { cn } from "@/lib/utils";

const InputField = React.forwardRef(function InputField(
  {
    label,
    type = "text", // "text" | "password" | "select"
    name, // important for form submission
    extra,
    placeholder,
    variant,
    state,
    disabled,
    onClickIcon,
    stateError,
    options = [], // for select: [{ value, label }]
    value, // controlled value (optional)
    defaultValue, // uncontrolled default
    onChange, // callback (works for both text and select)
    ...props
  },
  ref
) {
  const id = useId();
  const inputName = name || id;
  const isPassword = type === "password";
  const isSelect = type === "select";

  // refs
  const visibleRef = useRef(null); // text/password Input
  const hiddenRef = useRef(null); // hidden input for select

  // expose correct ref to parent
  useImperativeHandle(ref, () => (isSelect ? hiddenRef.current : visibleRef.current));

  // state for select value
  const [selected, setSelected] = useState(() =>
    value ?? defaultValue ?? ""
  );
  // keep selected in sync if used as controlled component
  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  // password show/hide
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  // When select changes, update hidden input + dispatch native events so forms/libraries notice.
  const handleSelect = (val) => {
    setSelected(val);

    // update hidden input DOM value and dispatch native events
    if (hiddenRef.current) {
      hiddenRef.current.value = val ?? "";
      // dispatch native input/change events so libraries like react-hook-form or vanilla listeners notice
      hiddenRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      hiddenRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // call optional onChange prop with event-like object
    if (onChange) {
      onChange({ target: { name: inputName, value: val } });
    }
  };

  return (
    <div className={`${extra}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white ${
            variant === "auth" ? "ml-1.5 font-medium" : "ml-1 font-bold"
          }`}
        >
          {label}
        </label>

        {onClickIcon && (
          <div
            className="flex cursor-pointer items-center gap-0"
            onClick={onClickIcon}
          >
            <span className="text-gray-400 hover:text-gray-600">
              Current Location
            </span>
            <TfiLocationPin className="text-xl" />
          </div>
        )}
      </div>

      <div className="relative mt-2">
        {isSelect ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={false}
                  className="flex h-12 w-full justify-between rounded-[6px] border bg-white/0 p-3 text-sm text-left"
                  disabled={disabled}
                >
                  {selected
                    ? options.find((o) => o.value === selected)?.label
                    : placeholder || "Select option..."}
                  <ChevronsUpDown className="ml-2 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search ${label?.toLowerCase() ?? "options"}...`}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            // currentValue typically is option.value
                            handleSelect(currentValue);
                          }}
                        >
                          {option.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              selected === option.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Hidden input that actually participates in form submission */}
            <input
              type="hidden"
              name={inputName}
              value={selected}
              readOnly
              ref={hiddenRef}
            />
          </>
        ) : (
          <>
            {/* text or password input */}
            <Input
              id={id}
              name={inputName}
              ref={visibleRef}
              className={`flex h-12 w-full items-center justify-center rounded-[6px] border bg-white/0 p-3 text-sm outline-none ${
                disabled
                  ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                  : state === "error"
                  ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                  : state === "success"
                  ? "border-black text-black placeholder:text-black dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                  : "border-gray-200 dark:!border-white/10 dark:text-white"
              }`}
              placeholder={placeholder}
              type={isPassword && showPassword ? "text" : type}
              disabled={disabled}
              defaultValue={defaultValue}
              value={value}
              onChange={(e) => {
                // pass through onChange so parent can control if needed
                if (onChange) onChange(e);
              }}
              {...props}
            />

            {isPassword && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </span>
            )}
          </>
        )}
      </div>

      {stateError && (
        <p className="mt-1 text-xs font-medium text-red-500">{stateError}</p>
      )}
    </div>
  );
});

export default InputField;
