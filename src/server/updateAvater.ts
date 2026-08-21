"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const updateAvater = async (
  avatarFile: File,
  prvAvatarFile: string | null | undefined,
) => {
  try {
    if (prvAvatarFile) {
      const publicDir = path.join(process.cwd(), "public");
      const oldAvatarPath = path.resolve(publicDir, prvAvatarFile);
      const relative = path.relative(publicDir, oldAvatarPath);
      if (!path.isAbsolute(relative) && !relative.startsWith("..")) {
        await rm(oldAvatarPath);
      }
    }

    const fileArrayBuffer = await avatarFile.arrayBuffer();

    const avatarName = `${crypto.randomUUID()}.jpeg`;

    await sharp(fileArrayBuffer)
      .resize({
        height: 256,
        width: 256,
        fit: "cover",
      })
      .jpeg({
        quality: 97,
        mozjpeg: true,
      })
      .toFile(`public/${avatarName}`);

    await auth.api.updateUser({
      body: {
        image: avatarName,
      },
      headers: await headers(),
    });

    revalidatePath("/studio/profile");

    return {
      isSuccess: true,
      message: "Avatar updated successfuly",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default updateAvater;
