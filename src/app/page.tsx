import { getCurrentSession } from "@/lib/server/sessions";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session, user } = await getCurrentSession();
  if (session === null) {
    return redirect("/login");
  }
  if (!user.emailVerified) {
    return redirect("/verify-email");
  }

  redirect("/link");
}
