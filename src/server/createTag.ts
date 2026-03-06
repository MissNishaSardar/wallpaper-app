"use server";

import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";

const createTag = async (slug: string) => {
  try {
    await prisma.tag.create({
      data: {
        slug,
      },
    });

    revalidatePath("/studio/create");

    return {
      isSuccess: true,
      message: "Tag added successfuly",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default createTag;
