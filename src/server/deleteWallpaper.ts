"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { rm } from "node:fs/promises";

const deleteWallpaper = async (wpId: string) => {
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

  const wallpaper = await prisma.wallpaper.findUnique({
    where: {
      id: wpId,
    },
  });

  if (!wallpaper || wallpaper.userId !== session.user.id) {
    return {
      isSuccess: false,
      message: "You are not authorized to delete this wallpaper",
    };
  }

  try {
    await prisma.wallpaper.delete({
      where: {
        id: wpId,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }

  try {
    await rm(`public/${wallpaper.image}`);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/studio");
  revalidatePath("/");

  return {
    isSuccess: true,
    message: "wallpaper deleted successfuly",
  };
};

export default deleteWallpaper;
