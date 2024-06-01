/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Input from "./inputs";
import { api } from "~/trpc/react";

interface FormData {
  name: string;
  startPoint: string;
  endPoint: string;
}

export function CreateBusRoute() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    startPoint: "",
    endPoint: "",
  });

  const createBusRoute = api.busRoutes.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setFormData({ name: "", startPoint: "", endPoint: "" });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createBusRoute.mutate(formData);
  };

  return (
    <div>
      <h1>Create Bus Route</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {(["name", "startPoint", "endPoint"] as Array<keyof FormData>).map(
          (field) => (
            <Input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={formData[field]}
              onChange={handleChange}
            />
          ),
        )}
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createBusRoute.isLoading}
        >
          {createBusRoute.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
