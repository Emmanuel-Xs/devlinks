import { redirect } from "next/navigation";

import { getCurrentSession } from "./sessions";

export async function goToLoginOrEmailVerified() {
  const { session, user } = await getCurrentSession();
  if (session === null) {
    redirect("/login");
  }
  if (!user.emailVerified) {
    redirect("/verify-email");
  }

  return { session, user };
}

export async function goToEmailVerified() {
  const { session, user } = await getCurrentSession();
  if (session !== null && !user.emailVerified) {
    redirect("/login");
  }

  return { session, user };
}

export async function goToEmailVerifyOrLinks() {
  const { session, user } = await getCurrentSession();
  if (session !== null) {
    if (!user.emailVerified) {
      redirect("/verify-email");
    }
    redirect("/links");
  }
}
