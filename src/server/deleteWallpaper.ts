"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const deleteWallpaper = async (wpId: string, wpName: string) => {
  try {
    await rm(`public/${wpName}`);

    await prisma.wallpaper.delete({
      where: {
        id: wpId,
      },
    });

    revalidatePath("/studio");
    revalidatePath("/");

    return {
      isSuccess: true,
      message: "wallpaper deleted successfuly",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default deleteWallpaper;
