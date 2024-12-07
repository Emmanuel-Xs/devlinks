import { goToLoginOrEmailVerified } from "@/lib/server/sessions";
import { redirect } from "next/navigation";

export default async function Home() {
  await goToLoginOrEmailVerified();

  redirect("/links");
}
