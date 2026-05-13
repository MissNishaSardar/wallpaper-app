"use client";

import { authClient } from "@/lib/auth-client";
import deleteWallpaper from "@/server/deleteWallpaper";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

type DeleteButtonProps = {
  uploaderId: string;
  walllpaperId: string;
  walllpaperName: string;
};

const DeleteButton = ({
  uploaderId,
  walllpaperId,
  walllpaperName,
}: DeleteButtonProps) => {
  const [isLoding, setIsLoding] = useState(false);

  const { refresh } = useRouter();

  const pathname = usePathname();

  const { data } = authClient.useSession();

  if (uploaderId !== data?.user.id || pathname !== "/studio") {
    return <></>;
  }

  const handleDelete = async () => {
    setIsLoding(true);

    const { isSuccess, message } = await deleteWallpaper(
      walllpaperId,
      walllpaperName,
    );

    await new Promise<void>((r) => setTimeout(r, 1000));

    if (isSuccess) {
      toast.success(message);

      refresh();
    } else {
      toast.error(message);
    }

    setIsLoding(false);
  };

  return (
    <Button
      type="button"
      onClick={handleDelete}
      variant={"destructive"}
      disabled={isLoding}>
      {isLoding ?
        <>
          <Loader2Icon className="animate-spin" /> Deleting...
        </>
      : <>
          <Trash2Icon /> Delete
        </>
      }
    </Button>
  );
};

export default DeleteButton;
