/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";



import { api } from "~/trpc/react";



interface FormData {
  licensePlate: string;
  capacity: string;
  routeId: string;
}

export function CreateBus() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    licensePlate: "",
    capacity: "",
    routeId: "",
  });

  const { data: busRoutes } = api.busRoutes.getAll.useQuery();
  const createBus = api.buses.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setFormData({ licensePlate: "", capacity: "", routeId: "" });
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
     createBus.mutate({ ...formData, capacity: Number(formData.capacity) });
  };

  return (
    <div>
      <h1>Create Bus</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {["licensePlate", "capacity"].map((field) => (
          <input
            key={field}
            type={field === "capacity" ? "number" : "text"}
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData[field]}
            onChange={handleChange}
            className="w-full rounded-full px-4 py-2 text-black"
          />
        ))}
        <select
          name="routeId"
          value={formData.routeId}
          onChange={handleChange}
          className="w-full rounded-full px-4 py-2 text-black"
        >
          <option value="">Select Bus Route</option>
          {busRoutes?.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createBus.isLoading}
        >
          {createBus.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
