import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const prisma = new PrismaClient();

export const busRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        licensePlate: z.string().min(1),
        capacity: z.number().min(1),
        routeId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const bus = await prisma.bus.create({
        data: {
          licensePlate: input.licensePlate,
          capacity: input.capacity,
          routeId: input.routeId,
        },
      });
      return bus;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const buses = await prisma.bus.findMany();
    return buses;
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const bus = await prisma.bus.findUnique({
        where: { id: input },
      });
      if (!bus) {
        throw new Error("Bus not found");
      }
      return bus;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        licensePlate: z.string().min(1).optional(),
        capacity: z.number().min(1).optional(),
        routeId: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const bus = await prisma.bus.update({
        where: { id: input.id },
        data: {
          licensePlate: input.licensePlate,
          capacity: input.capacity,
          routeId: input.routeId,
        },
      });
      return bus;
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await prisma.bus.delete({
        where: { id: input },
      });
      return { success: true };
    }),
});

export default busRouter;
