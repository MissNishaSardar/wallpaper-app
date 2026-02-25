"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
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

const CreateWallpaperForm = () => {
  const [isFile, setIsFile] = useState(false);

  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const;

  const anchor = useComboboxAnchor();

  const { openFilePicker, filesContent } = useFilePicker({
    multiple: false,
    accept: "image/*",
    readAs: "DataURL",
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
  });

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
          items={frameworks}
          defaultValue={[frameworks[0]]}>
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
              {(item) => (
                <ComboboxItem
                  key={item}
                  value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Button>Upload</Button>
      </CardContent>

      <CardFooter className="justify-center gap-1">
        <CreateTagForm />
      </CardFooter>
    </>
  );
};

export default CreateWallpaperForm;
