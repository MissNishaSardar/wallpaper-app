"use client";

import { updateNameSchema, UpdateNameSchemaType } from "@/lib/zodSchema";
import updateName from "@/server/updateName";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, UserRoundPenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { CardContent, CardFooter } from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

type UpdateNameFormProps = {
  prvName: string;
};

const UpdateNameForm = ({ prvName }: UpdateNameFormProps) => {
  const { refresh } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: prvName,
    },
    mode: "all",
  });

  const updateNameHandler = async ({ name }: UpdateNameSchemaType) => {
    const { isSuccess, message } = await updateName(name);

    await new Promise<void>((r) => setTimeout(r, 1000));

    if (isSuccess) {
      toast.success(message);

      refresh();
    } else {
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateNameHandler)}
      className=""
      noValidate>
      <CardContent>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Enter your name"
                autoComplete="additional-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-1">
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={isSubmitting || !isDirty}>
          {isSubmitting ?
            <>
              <LoaderIcon className="animate-spin" /> Updating...
            </>
          : <>
              <UserRoundPenIcon /> Update
            </>
          }
        </Button>
      </CardFooter>
    </form>
  );
};

export default UpdateNameForm;
