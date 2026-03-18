import WallpaperCard from "@/components/Wallpaper/WallpaperCard";
import prisma from "@/lib/database/dbClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Home page of Wallpaper App",
};

const page = async () => {
  const allWallpapers = await prisma.wallpaper.findMany();

  console.log(allWallpapers);

  return (
    <section className="grid grid-cols-3 gap-4">
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
    </section>
  );
};

export default page;
