"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { rm } from "node:fs/promises";

const createWallpaper = async (wpFile: File, wpTags: string[]) => {
  let session: Awaited<ReturnType<typeof auth.api.getSession>> = null;

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.log(error);
  }

  if (!session) {
    redirect("/auth");
  }

  const wpUserId = session.user.id;

  let imgName = "";

  try {
    const fileArrayBuffer = await wpFile.arrayBuffer();

    imgName = `${crypto.randomUUID()}.jpeg`;

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

    if (imgName) {
      await rm(`public/${imgName}`, { force: true }).catch(() => undefined);
    }

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default createWallpaper;
