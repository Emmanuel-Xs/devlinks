import { getUserUsernames } from "@/drizzle/query/usernames";
import PageHeading from "@/features/(dashboard)/components/page-heading";
import UsernamesForm from "@/features/(dashboard)/settings/components/usernames-form";
import { goToLoginOrEmailVerified } from "@/lib/server/auth-checks";

export default async function UsernamesPage() {
  const { user } = await goToLoginOrEmailVerified();

  const usernames = await getUserUsernames(user.id);

  return (
    <section className="grid h-full w-full rounded-xl bg-card">
      <div className="space-y-10 p-6 sm:p-10">
        <PageHeading
          title="Add Multiple Usernames"
          description="You can add at most four (4) usernames at a time. Modify others when used up."
        />
        <UsernamesForm usernames={usernames} userId={user.id} />
      </div>
    </section>
  );
}
