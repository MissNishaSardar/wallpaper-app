"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { buttonVariants } from "../shadcnui/button";

const LoginDashboardButton = () => {
  const { data } = authClient.useSession();

  if (data) {
    return (
      <Link
        href={"/studio"}
        className={`${buttonVariants()}`}>
        Studio
      </Link>
    );
  }

  return (
    <Link
      href={"/auth"}
      className={`${buttonVariants()}`}>
      Login
    </Link>
  );
};

export default LoginDashboardButton;
