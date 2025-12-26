"use client";

import { registerSchema, RegisterSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, UserRoundPlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const RegisterForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "all",
	});

	const registerHandeler = async (registerData: RegisterSchemaType) => {
		console.log(registerData);
	};

	return (
		<form
			onSubmit={handleSubmit(registerHandeler)}
			className="grid gap-4"
			noValidate>
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
			<Controller
				name="email"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Email</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							type="email"
							placeholder="Enter your email"
							autoComplete="email"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Password</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							type="password"
							placeholder="Enter your password"
							autoComplete="new-password"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="confirmPassword"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							type="password"
							placeholder="Confirm your password"
							autoComplete="current-password"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Button
				type="submit"
				className="cursor-pointer"
				disabled={isSubmitting}>
				{isSubmitting ? (
					<>
						<LoaderIcon className="animate-spin" /> Submitting
					</>
				) : (
					<>
						<UserRoundPlusIcon /> Register
					</>
				)}
			</Button>
		</form>
	);
};

export default RegisterForm;
