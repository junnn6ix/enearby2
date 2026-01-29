import { redirect } from "next/navigation";
import { caller } from "@/trpc/server";
import SignUp from "@/modules/auth/ui/views/SignUp";

const Page = async () => {
  const session = await caller.auth.session();

  if (session.user) {
    redirect("/");
  }
  return (
    <div className="h-screen">
      <SignUp />
    </div>
  );
};

export default Page;
