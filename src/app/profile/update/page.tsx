import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProfilePanel } from "@/components/profile-panel";
import { getAuth } from "@/lib/auth";
import { env } from "@/lib/env";

async function UpdateBody() {
  if (!env("BETTER_AUTH_MONGODB_URL")) {
    redirect("/signin?reason=protected&next=/profile/update");
  }

  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=protected&next=/profile/update");
  }

  return (
    <ProfilePanel
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
    />
  );
}

export default function ProfileUpdatePage() {
  return (
    <div className="px-4 py-6">
      <Suspense
        fallback={
          <div className="mx-auto h-64 w-full max-w-[720px] animate-pulse rounded-2xl bg-[#fafcfa]" />
        }
      >
        <UpdateBody />
      </Suspense>
    </div>
  );
}
