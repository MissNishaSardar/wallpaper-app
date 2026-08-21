"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const LogoutButton = () => {
  const [isLoding, setIsLoding] = useState(false);

  const { push } = useRouter();

  const logoutHandeler = async () => {
    setIsLoding(true);

    try {
      const { error } = await authClient.signOut();

      await new Promise<void>((r) => setTimeout(r, 1000));

      if (error) {
        toast.error(error.message || "Something went wrong! Try again");

        return;
      }

      console.log("Logout Successful");

      push("/auth");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong! Try again");
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={logoutHandeler}
      variant={"destructive"}
      disabled={isLoding}>
      {isLoding ?
        <>
          <Loader2Icon className="animate-spin" /> Logging out
        </>
      : <>
          <LogOutIcon /> Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
