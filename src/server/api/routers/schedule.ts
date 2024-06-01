import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const prisma = new PrismaClient();

export const scheduleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        startPoint: z.string().min(1),
        endPoint: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const scheduleRoute = await prisma.schedule.create({
        data: {
          name: input.name,
          startPoint: input.startPoint,
          endPoint: input.endPoint,
        },
      });
      return scheduleRoute;
    }),

  getAll: protectedProcedure.query(async ({ ctx }: { ctx }) => {
    const scheduleRoute = await prisma.schedule.findMany();
    return busRoutes;
  }),

  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const busRoute = await prisma.busRoute.findUnique({
        where: { id: input },
      });
      if (!busRoute) {
        throw new Error("Bus route not found");
      }
      return busRoute;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        startPoint: z.string().min(1).optional(),
        endPoint: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const busRoute = await prisma.busRoute.update({
        where: { id: input.id },
        data: {
          name: input.name,
          startPoint: input.startPoint,
          endPoint: input.endPoint,
        },
      });
      return busRoute;
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await prisma.busRoute.delete({
        where: { id: input },
      });
      return { success: true };
    }),
});

export default busRouteRouter;
