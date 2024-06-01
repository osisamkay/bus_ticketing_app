import { busRouter } from "~/server/api/routers/bus";
import { busRouteRouter } from "~/server/api/routers/busRoute";
import { postRouter } from "~/server/api/routers/post";
import { scheduleRouter } from "~/server/api/routers/schedule";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  buses: busRouter,
  busRoutes: busRouteRouter,
  schedule: scheduleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
