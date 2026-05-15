"use client";

import { clientEnv } from "@/lib/env/clientEnv";
import updateAvater from "@/server/updateAvater";
import { CloudUploadIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";

type UpdateAvaterFormProps = {
  prvImage: string | null | undefined;
};

const UpdateAvaterForm = ({ prvImage }: UpdateAvaterFormProps) => {
  const [isFile, setIsFile] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const { refresh } = useRouter();

  const { openFilePicker, filesContent, plainFiles } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
  });

  const handleUpdate = async () => {
    setIsLoding(true);

    const { isSuccess, message } = await updateAvater(plainFiles[0], prvImage);

    // await new Promise<void>((r) => setTimeout(r, 1000));

    if (isSuccess) {
      toast.success(message);

      refresh();
    } else {
      toast.error(message);
    }

    setIsLoding(false);
  };

  return (
    <>
      <CardContent className="grid place-items-center">
        <button
          type="button"
          onClick={openFilePicker}
          className="relative">
          {!isFile && (
            <Image
              src={
                prvImage ?
                  `${clientEnv.NEXT_PUBLIC_CDN_URL}${prvImage}`
                : "https://placehold.co/256x256/png"
              }
              alt=""
              className="h-64 w-64 rounded-full object-contain"
              height={256}
              width={256}
            />
          )}

          {filesContent.map((file, idx) => (
            <Image
              key={idx}
              src={file.content}
              alt={file.name}
              className="h-64 w-64 rounded-full object-contain"
              height={256}
              width={256}
            />
          ))}
        </button>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-1">
        <Button
          type="button"
          onClick={handleUpdate}
          //   variant={"destructive"}
          disabled={!isFile}>
          {isLoding ?
            <>
              <Loader2Icon className="animate-spin" /> Uploading..
            </>
          : <>
              <CloudUploadIcon /> Upload
            </>
          }
        </Button>
      </CardFooter>
    </>
  );
};

export default UpdateAvaterForm;
