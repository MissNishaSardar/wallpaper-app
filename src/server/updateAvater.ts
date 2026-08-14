"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const updateAvater = async (avatarFile: File) => {
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

  const prvAvatarFile = session.user.image;

  let avatarName = "";

  try {
    const fileArrayBuffer = await avatarFile.arrayBuffer();

    avatarName = `${crypto.randomUUID()}.jpeg`;

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

    if (prvAvatarFile) {
      const publicDir = path.join(process.cwd(), "public");
      const oldAvatarPath = path.resolve(publicDir, prvAvatarFile);

      if (oldAvatarPath.startsWith(publicDir)) {
        await rm(oldAvatarPath, { force: true }).catch(() => undefined);
      }
    }

    return {
      isSuccess: true,
      message: "Avatar updated successfuly",
    };
  } catch (error) {
    console.log(error);

    if (avatarName) {
      await rm(`public/${avatarName}`, { force: true }).catch(() => undefined);
    }

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default updateAvater;
