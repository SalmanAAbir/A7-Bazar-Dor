import { toNextJsHandler } from "better-auth/next-js";
import { auth, authReady } from "@/lib/auth";

const handlers = toNextJsHandler(auth);

export async function GET(request: Request) {
  await authReady;
  return handlers.GET(request);
}

export async function POST(request: Request) {
  await authReady;
  return handlers.POST(request);
}
