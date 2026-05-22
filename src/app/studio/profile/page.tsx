import UpdateAvaterForm from "@/components/Forms/UpdateAvaterForm";
import UpdateNameForm from "@/components/Forms/UpdateNameForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | Wallpaper App",
  description: "Profile page of Wallpaper App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const { name, image } = session.user;

  return (
    <section className="grid h-[90dvh] place-items-center">
      <div className="space-y-8">
        <Card className="w-xs">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Change Avater
            </CardTitle>
          </CardHeader>

          <UpdateAvaterForm prvImage={image} />
        </Card>

        <Card className="w-xs">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Change Name
            </CardTitle>
          </CardHeader>

          <UpdateNameForm prvName={name} />
        </Card>
      </div>
    </section>
  );
};

export default page;
