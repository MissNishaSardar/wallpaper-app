import WallpaperCard from "@/components/Wallpaper/WallpaperCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Studio | Wallpaper App",
  description: "Studio page of Wallpaper App",
};

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const wpUserId = session.user.id;

  const userWallpapers = await prisma.wallpaper.findMany({
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      tags: {
        select: {
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: wpUserId,
    },
  });

  return (
    <section className="grid grid-cols-3 gap-4">
      {userWallpapers.map((item) => (
        <WallpaperCard
          key={item.id}
          info={item}
        />
      ))}
    </section>
  );
};

export default page;
