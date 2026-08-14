import CreateWallpaperForm from "@/components/Forms/CreateWallpaperForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Wallpaper | Wallpaper App",
  description: "Create Wallpaper page of Wallpaper App",
};

// export const dynamic = "force-dynamic";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const allTags = await prisma.tag.findMany();

  return (
    <section className="grid h-[90dvh] place-items-center">
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create
          </CardTitle>
        </CardHeader>

        <CreateWallpaperForm wpTags={allTags} />
      </Card>
    </section>
  );
};

export default page;
