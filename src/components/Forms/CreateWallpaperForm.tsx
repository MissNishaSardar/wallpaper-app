"use client";

import createWallpaper from "@/server/createWallpaper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { Tag } from "../../../generated/prisma/client";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../shadcnui/combobox";
import CreateTagForm from "./CreateTagForm";

type CreateWallpaperFormProps = {
  wpTags: Tag[];
};

const CreateWallpaperForm = ({ wpTags }: CreateWallpaperFormProps) => {
  const [isFile, setIsFile] = useState(false);
  const [inputTags, setInputTags] = useState<string[]>([]);

  const { push } = useRouter();

  const anchor = useComboboxAnchor();

  const { openFilePicker, filesContent, plainFiles } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
  });

  const handelUpload = async () => {
    if (isFile && inputTags.length >= 1) {
      const tagIds = wpTags
        .filter((tag) => inputTags.includes(tag.slug))
        .map((tag) => tag.id);

      const { isSuccess, message } = await createWallpaper(
        plainFiles[0],
        tagIds,
      );

      await new Promise<void>((r) => setTimeout(r, 1000));

      if (isSuccess) {
        toast.success(message);
        push("/studio");
      } else {
        toast.error(message);
      }
    } else {
      toast.error("Select file and tags.");
    }
  };

  return (
    <>
      <CardContent className="grid gap-6">
        <button
          type="button"
          onClick={openFilePicker}
          className="relative">
          {!isFile && (
            <Image
              src={"https://placehold.co/640x360/png"}
              alt=""
              className="h-90 w-160 object-contain"
              height={360}
              width={640}
            />
          )}

          {filesContent.map((file, idx) => (
            <Image
              key={idx}
              src={file.content}
              alt={file.name}
              height={360}
              width={640}
              className="h-90 w-160 object-contain"
            />
          ))}
        </button>

        <Combobox
          multiple
          autoHighlight
          items={wpTags}
          onValueChange={(v) => setInputTags(v)}
          value={inputTags}>
          <ComboboxChips
            ref={anchor}
            className="w-full">
            <ComboboxValue>
              {(values) => (
                <Fragment>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput />
                </Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: Tag) => (
                <ComboboxItem
                  key={item.id}
                  value={item.slug}>
                  {item.slug}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Button
          onClick={handelUpload}
          disabled={!isFile || inputTags.length === 0}>
          Upload
        </Button>
      </CardContent>

      <CardFooter className="justify-center gap-1">
        <CreateTagForm />
      </CardFooter>
    </>
  );
};

export default CreateWallpaperForm;
