"use client";

import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { useNotificationContext } from "@/createContextStore/NotificationContext";
import fieldConfigs from "./fieldConfigs.json";

export default function RHFCustomForm() {
  const { openNotification } = useNotificationContext();

  // build defaultValues from JSON
  const defaultValues = fieldConfigs.reduce((acc, f) => {
    acc[f.name] = f.defaultValue || "";
    return acc;
  }, {});

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log("✅ Submitted Data:", data);
    openNotification(
      "success",
      "Form Submitted ✅",
      <pre className="mt-2 w-full rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-xl mx-auto p-6 bg-white dark:bg-navy-800 shadow-2xl rounded-2xl"
    >
      {fieldConfigs.map((field) => {
        // Convert JSON to React Hook Form rules
        let rules = {};
        if (field.required) rules.required = field.required;
        if (field.minLength) rules.minLength = field.minLength;
        if (field.pattern)
          rules.pattern = {
            value: new RegExp(field.pattern.value),
            message: field.pattern.message,
          };

        // confirm password validation
        if (field.name === "confirmPassword") {
          rules.validate = (val) =>
            val === watch("password") || "Passwords do not match";
        }

        // upload validation (file type + size)
        if (field.type === "file") {
          rules.validate = (file) => {
            if (!file) return field.required || "File is required";

            if (field.fileType && !file.type.match(field.fileType)) {
              return `File type must be ${field.fileType}`;
            }

            if (field.fileSize && file.size > field.fileSize) {
              return field.fileSizeMessage || "File size too large";
            }

            return true;
          };
        }

        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={rules}
            render={({ field: rhfField }) => {
              const handleChange =
                field.type === "file"
                  ? (e) => {
                      rhfField.onChange(e.target.value);
                    }
                  : rhfField.onChange;

              return (
                <InputField
                  {...rhfField}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  options={field.options}
                  accept={field.fileType || undefined} // ✅ restrict file dialog
                  onChange={handleChange}
                  state={
                    errors[field.name]
                      ? "error"
                      : rhfField.value
                      ? "success"
                      : ""
                  }
                  stateError={errors[field.name]?.message}
                />
              );
            }}
          />
        );
      })}

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
