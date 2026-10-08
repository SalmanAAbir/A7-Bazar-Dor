import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getMigrations } from "better-auth/db/migration";

const database = new DatabaseSync(`${process.cwd()}/auth.sqlite`);

const options = {
  database,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
};

export const auth = betterAuth(options);

export const authReady = getMigrations(options).then((plan) =>
  plan.runMigrations(),
);
