import { tagSchema, TagSchemaType } from "@/lib/zodSchema";
import createTag from "@/server/createTag";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcnui/dialog";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const CreateTagForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      slug: "",
    },
    mode: "all",
  });

  const tagHandeler = async ({ slug }: TagSchemaType) => {
    try {
      const { isSuccess, message } = await createTag(slug);

      await new Promise<void>((r) => setTimeout(r, 1000));

      if (isSuccess) {
        toast.success(message);

        setDialogOpen(false);

        refresh();
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ?
          error.message
        : "Something went wrong! Try again",
      );
    }
  };

  return (
    <Dialog
      onOpenChange={(s) => setDialogOpen(s)}
      open={dialogOpen}>
      <DialogTrigger
        render={<Button variant="link">Missing tags? Create Now</Button>}
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Create new tag</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(tagHandeler)}
          className="grid gap-4 pb-4"
          noValidate>
          <Controller
            name="slug"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Tag Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Enter a Tag Name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ?
              <>
                <LoaderIcon className="animate-spin" /> Submitting
              </>
            : <>
                <SendIcon /> Submit
              </>
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTagForm;
