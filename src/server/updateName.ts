"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const updateName = async (newName: string) => {
  try {
    await auth.api.updateUser({
      body: {
        name: newName,
      },
      headers: await headers(),
    });

    revalidatePath("/studio/profile");

    return {
      isSuccess: true,
      message: "Name added successfuly",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "Something went wrong! Try again",
    };
  }
};

export default updateName;
