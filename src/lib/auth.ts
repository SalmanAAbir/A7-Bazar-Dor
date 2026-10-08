import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { env } from "@/lib/env";

function createAuth() {
  const mongodbUrl = env("BETTER_AUTH_MONGODB_URL");
  if (!mongodbUrl) {
    throw new Error("BETTER_AUTH_MONGODB_URL is not set");
  }

  const client = globalForAuth.mongoClient ?? new MongoClient(mongodbUrl);
  globalForAuth.mongoClient = client;

  return betterAuth({
    baseURL: env("BETTER_AUTH_URL"),
    database: mongodbAdapter(client.db(), { client }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: env("GOOGLE_CLIENT_ID") ?? "",
        clientSecret: env("GOOGLE_CLIENT_SECRET") ?? "",
      },
    },
    plugins: [nextCookies()],
  });
}

const globalForAuth = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
  auth?: ReturnType<typeof createAuth>;
};

export function getAuth() {
  globalForAuth.auth ??= createAuth();
  return globalForAuth.auth;
}
