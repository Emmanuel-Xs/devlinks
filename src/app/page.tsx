import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";
import { redirect } from "next/navigation";

export default async function Home() {
  await goToLoginOrEmailVerified();

  redirect("/links");
}
