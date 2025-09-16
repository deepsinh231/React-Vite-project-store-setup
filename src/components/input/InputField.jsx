// "use client";

// import React, {
//   useId,
//   useState,
//   useRef,
//   useEffect,
//   useImperativeHandle,
// } from "react";
// import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
// import { TfiLocationPin } from "react-icons/tfi";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";

// const InputField = React.forwardRef(function InputField(
//   {
//     label,
//     type = "text", // "text" | "password" | "select" | "date" | "file"
//     name,
//     extra,
//     placeholder,
//     variant,
//     state,
//     disabled,
//     onClickIcon,
//     stateError,
//     options = [],
//     value,
//     defaultValue,
//     onChange,
//     ...props
//   },
//   ref
// ) {
//   const id = useId();
//   const inputName = name || id;
//   const isPassword = type === "password";
//   const isSelect = type === "select";
//   const isDate = type === "date";
//   const isFile = type === "file";

//   const visibleRef = useRef(null);
//   const hiddenRef = useRef(null);

//   useImperativeHandle(ref, () =>
//     isSelect || isDate ? hiddenRef.current : visibleRef.current
//   );

//   const [selected, setSelected] = useState(() => value ?? defaultValue ?? "");
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (value !== undefined) setSelected(value);
//   }, [value]);

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((s) => !s);

//   const handleSelect = (val) => {
//     setSelected(val);

//     if (hiddenRef.current) {
//       hiddenRef.current.value = val ?? "";
//       hiddenRef.current.dispatchEvent(new Event("input", { bubbles: true }));
//       hiddenRef.current.dispatchEvent(new Event("change", { bubbles: true }));
//     }

//     if (onChange) {
//       onChange({ target: { name: inputName, value: val } });
//     }
//   };

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
//         {isSelect ? (
//           // 🔽 Select Input
//           <>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={false}
//                   className="flex h-12 w-full justify-between rounded-[6px] border bg-white/0 p-3 text-sm text-left"
//                   disabled={disabled}
//                 >
//                   {selected
//                     ? options.find((o) => o.value === selected)?.label
//                     : placeholder || "Select option..."}
//                   <ChevronsUpDown className="ml-2 opacity-50" />
//                 </Button>
//               </PopoverTrigger>

//               <PopoverContent className="w-full p-0">
//                 <Command>
//                   <CommandInput
//                     placeholder={`Search ${
//                       label?.toLowerCase() ?? "options"
//                     }...`}
//                     className="h-9"
//                   />
//                   <CommandList>
//                     <CommandEmpty>No option found.</CommandEmpty>
//                     <CommandGroup>
//                       {options.map((option) => (
//                         <CommandItem
//                           key={option.value}
//                           value={option.value}
//                           onSelect={(currentValue) =>
//                             handleSelect(currentValue)
//                           }
//                         >
//                           {option.label}
//                           <Check
//                             className={cn(
//                               "ml-auto",
//                               selected === option.value
//                                 ? "opacity-100"
//                                 : "opacity-0"
//                             )}
//                           />
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>

//             <input
//               type="hidden"
//               name={inputName}
//               value={selected}
//               readOnly
//               ref={hiddenRef}
//             />
//           </>
//         ) : isDate ? (
//           // 🔽 Date Picker
//           <>
//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className={cn(
//                     "flex h-12 w-full items-center justify-between rounded-[6px] border p-3 text-sm text-left",
//                     !selected && "text-muted-foreground"
//                   )}
//                   disabled={disabled}
//                 >
//                   {selected
//                     ? format(new Date(selected), "dd/MM/yyyy")
//                     : placeholder || "Pick a date"}
//                   <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   captionLayout="dropdown"
//                   selected={selected ? new Date(selected) : undefined}
//                   onSelect={(date) => {
//                     if (!date) return;
//                     handleSelect(date.toISOString());
//                     setOpen(false);
//                   }}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>

//             <input
//               type="hidden"
//               name={inputName}
//               value={selected}
//               readOnly
//               ref={hiddenRef}
//             />
//           </>
//         ) : isFile ? (
//           // 🔽 File Input
//           <>
//             <Input
//               id={id}
//               name={inputName}
//               ref={visibleRef}
//               type="file"
//               disabled={disabled}
//               onChange={(e) => {
//                 const file = e.target.files?.[0] || null;
//                 onChange?.(file);
//               }}
//               className="flex h-12 w-full items-center justify-center rounded-[6px] border bg-white/0 p-2 text-sm outline-none"
//               {...props}
//             />
//           </>
//         ) : (
//           // 🔽 Text / Password
//           <>
//             <Input
//               id={id}
//               name={inputName}
//               ref={visibleRef}
//               className={`flex h-12 w-full items-center justify-center rounded-[6px] border bg-white/0 p-3 text-sm outline-none ${
//                 disabled
//                   ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
//                   : state === "error"
//                   ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
//                   : state === "success"
//                   ? "border-black text-black placeholder:text-black dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
//                   : "border-gray-200 dark:!border-white/10 dark:text-white"
//               }`}
//               placeholder={placeholder}
//               type={isPassword && showPassword ? "text" : type}
//               disabled={disabled}
//               defaultValue={defaultValue}
//               value={isFile ? undefined : value} // ✅ avoid invalid value on file inputs
//               onChange={(e) => onChange?.(e)}
//               {...props}
//             />

//             {isPassword && (
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//               </span>
//             )}
//           </>
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
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import FileInput from "./FileInput";
import { TfiLocationPin } from "react-icons/tfi";

const InputField = forwardRef(
  (
    {
      label,
      type = "text",
      name,
      placeholder,
      extra,
      variant,
      state,
      stateError,
      disabled,
      onClickIcon,
      options = [],
      value,
      defaultValue,
      onChange,
      accept,
    },
    ref
  ) => {
    const id = useId();
    const inputName = name || id;
    const [selected, setSelected] = useState(value ?? defaultValue ?? "");

    // internal refs for exposing correct element
    const visibleRef = useRef(null);
    const hiddenRef = useRef(null);

    useImperativeHandle(ref, () => {
      if (type === "select" || type === "date") return hiddenRef.current;
      return visibleRef.current;
    });

    return (
      <div className={`${extra}`}>
        {/* Label + Optional Icon */}
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

        {/* Field */}
        <div className="relative mt-2">
          {(type === "text" || type === "email") && (
            <TextInput
              ref={visibleRef}
              id={id}
              name={inputName}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              state={state}
              disabled={disabled}
              onChange={onChange}
            />
          )}

          {type === "password" && (
            <PasswordInput
              ref={visibleRef}
              id={id}
              name={inputName}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              state={state}
              disabled={disabled}
              onChange={onChange}
            />
          )}

          {type === "select" && (
            <SelectInput
              ref={hiddenRef}
              selected={selected}
              setSelected={(val) => {
                setSelected(val);
                onChange?.({ target: { name: inputName, value: val } });
              }}
              options={options}
              placeholder={placeholder}
              label={label}
              disabled={disabled}
              name={inputName}
            />
          )}

          {type === "date" && (
            <DateInput
              ref={hiddenRef}
              selected={selected}
              setSelected={(val) => {
                setSelected(val);
                onChange?.({ target: { name: inputName, value: val } });
              }}
              placeholder={placeholder}
              disabled={disabled}
              name={inputName}
            />
          )}

          {type === "file" && (
            <FileInput
              ref={visibleRef}
              id={id}
              name={inputName}
              accept={accept}
              disabled={disabled}
              onChange={onChange}
            />
          )}
        </div>

        {/* Error Message */}
        {stateError && (
          <p className="mt-1 text-xs font-medium text-red-500">{stateError}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
