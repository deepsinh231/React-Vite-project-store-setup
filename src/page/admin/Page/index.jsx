import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGloble from "@/components/input/InputGloble";
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
    photo: z.any().refine((file) => !!file, "Upload a photo"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RHFCustomForm() {
  const [fileName, setFileName] = useState("");
  const { openNotification } = useNotificationContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      date: "",
      startDate: "",
      endDate: "",
      file: null,
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
            <div>
              <InputGloble
                {...field}
                placeholder="Enter your name"
                state={errors.name ? "error" : field.value ? "success" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <InputGloble
                {...field}
                type="email"
                label="Email"
                placeholder="Enter your email"
                state={errors.email ? "error" : field.value ? "success" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <InputGloble
                {...field}
                type="password"
                placeholder="Enter password"
                state={errors.password ? "error" : field.value ? "success" : ""}
                stateError={errors.password?.message}
              />
            </div>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div>
              <InputGloble
                {...field}
                type="password"
                placeholder="Confirm password"
                state={
                  errors.confirmPassword
                    ? "error"
                    : field.value
                    ? "success"
                    : ""
                }
                stateError={errors.confirmPassword?.message}
              />
            </div>
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <div>
              <InputGloble
                {...field} // includes value, onChange
                type="select"
                options={[
                  { value: "next.js", label: "Next.js Deepsinh" },
                  { value: "sveltekit", label: "SvelteKit" },
                  { value: "nuxt.js", label: "Nuxt.js" },
                  { value: "remix", label: "Remix" },
                  { value: "astro", label: "Astro" },
                ]}
                state={errors.date ? "error" : field.value ? "success" : ""}
              />
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Single Date */}
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <div>
              <InputGloble
                {...field}
                type="select"
                options={[
                  { value: "next.js", label: "Next.js" },
                  { value: "sveltekit", label: "SvelteKit" },
                  { value: "nuxt.js", label: "Nuxt.js" },
                  { value: "remix", label: "Remix" },
                  { value: "astro", label: "Astro" },
                ]}
                state={errors.date ? "error" : field.value ? "success" : ""}
              />
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="Framework"
          control={control}
          render={({ field }) => (
            <div>
              <InputGloble
                {...field}
                options={[
                  { value: "next.js", label: "Next.js" },
                  { value: "sveltekit", label: "SvelteKit" },
                  { value: "nuxt.js", label: "Nuxt.js" },
                  { value: "remix", label: "Remix" },
                  { value: "astro", label: "Astro" },
                ]}
                type="select"
                label="Framework"
                state={errors.date ? "error" : field.value ? "success" : ""}
              />
              {errors.date && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <div>
                <InputGloble
                  {...field}
                  type="date"
                  placeholder="Start Date"
                  state={
                    errors.startDate ? "error" : field.value ? "success" : ""
                  }
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <div>
                <InputGloble
                  {...field}
                  type="file"
                  placeholder="End Date"
                  state={
                    errors.endDate ? "error" : field.value ? "success" : ""
                  }
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Upload Photo */}
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  setFileName(file?.name || "");
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
              />
              {fileName && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Selected: {fileName}
                </p>
              )}
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
