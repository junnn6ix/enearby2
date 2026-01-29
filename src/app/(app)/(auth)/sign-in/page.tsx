import { redirect } from "next/navigation";
import { caller } from "@/trpc/server";
import SignIn from "@/modules/auth/ui/views/SignIn";

const Page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/");
  }

  return <SignIn />;
};

export default Page;
