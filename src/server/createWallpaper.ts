"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";

const createWallpaper = async (wpFile: File, wpTags: string[]) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/auth");
    }

    const wpUserId = session.user.id;

    const fileArrayBuffer = await wpFile.arrayBuffer();

    const imgName = `${crypto.randomUUID()}.jpeg`;

    await sharp(fileArrayBuffer)
      .resize({
        height: 1080,
        width: 1920,
        fit: "cover",
      })
      .jpeg({
        quality: 97,
        mozjpeg: true,
      })
      .toFile(`public/${imgName}`);

    await prisma.wallpaper.create({
      data: {
        image: imgName,
        userId: wpUserId,
        tags: {
          connect: wpTags.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/");

    return {
      isSuccess: true,
      message: "Wallpaper added successfuly",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default createWallpaper;
