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
