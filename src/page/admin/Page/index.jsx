"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/input/InputField";
import { Button } from "@/components/ui/button";
import { useNotificationContext } from "../../../createContextStore/NotificationContext";

// ✅ Validation schema
const FormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    date: z.string().min(1, "Select a date"),
    startDate: z.string().min(1, "Start date required"),
    endDate: z.string().min(1, "End date required"),
    framework: z.string().min(1, "Framework required"),
    photo: z
      .any()
      .refine((file) => file instanceof File, "Upload a valid photo"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RHFCustomForm() {
  const { openNotification } = useNotificationContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Hellos",
      email: "deep@gmail.com",
      password: "aa@AA123",
      confirmPassword: "aa@AA123",
      date: "01/01/2023",
      startDate: "01/01/2024",
      endDate: "01/01/2025",
      framework: "remix",
      photo: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    openNotification(
      "success",
      "Form Submitted ✅",
      <pre className="mt-2 w-full rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-xl mx-auto p-6 bg-white dark:bg-navy-800 shadow-2xl rounded-2xl"
      >
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              label="Name"
              placeholder="Enter your name"
              state={errors.name ? "error" : field.value ? "success" : ""}
              stateError={errors.name?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              type="email"
              label="Email"
              placeholder="Enter your email"
              state={errors.email ? "error" : field.value ? "success" : ""}
              stateError={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              type="password"
              label="Password"
              placeholder="Enter password"
              state={errors.password ? "error" : field.value ? "success" : ""}
              stateError={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              type="password"
              label="Confirm Password"
              placeholder="Confirm password"
              state={
                errors.confirmPassword ? "error" : field.value ? "success" : ""
              }
              stateError={errors.confirmPassword?.message}
            />
          )}
        />

        {/* Framework (Select) */}
        <Controller
          name="framework"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              type="select"
              label="Framework"
              options={[
                { value: "next.js", label: "Next.js" },
                { value: "sveltekit", label: "SvelteKit" },
                { value: "nuxt.js", label: "Nuxt.js" },
                { value: "remix", label: "Remix" },
                { value: "astro", label: "Astro" },
              ]}
              state={errors.framework ? "error" : field.value ? "success" : ""}
              stateError={errors.framework?.message}
            />
          )}
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                type="date"
                label="Start Date"
                placeholder="Select start date"
                state={
                  errors.startDate ? "error" : field.value ? "success" : ""
                }
                stateError={errors.startDate?.message}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                type="date"
                label="End Date"
                placeholder="Select end date"
                state={errors.endDate ? "error" : field.value ? "success" : ""}
                stateError={errors.endDate?.message}
              />
            )}
          />
        </div>

        {/* Single Date */}
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              type="date"
              label="Event Date"
              placeholder="Pick a date"
              state={errors.date ? "error" : field.value ? "success" : ""}
              stateError={errors.date?.message}
            />
          )}
        />

        {/* Photo Upload */}
        <Controller
          name="photo"
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <div>
              <InputField
                {...rest}
                type="file"
                label="Upload Photo"
                onChange={(e) => {
                  onChange(e.target.value);
                  console.log("e", e);
                }}
                state={errors.photo ? "error" : rest.value ? "success" : ""}
              />
              {errors.photo && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
