import { redirect } from "next/navigation";

import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export default async function Home() {
  await goToLoginOrEmailVerified();

  redirect("/links");
}
