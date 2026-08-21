import WallpaperCard from "@/components/Wallpaper/WallpaperCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Home page of Wallpaper App",
};

const page = async () => {
  const allWallpapers = await prisma.wallpaper.findMany({
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
    take: 20,
  });

  return (
    <section className="grid grid-cols-3 gap-4">
      {allWallpapers.map((item) => (
        <WallpaperCard
          key={item.id}
          info={item}
        />
      ))}
    </section>
  );
};

export default page;
