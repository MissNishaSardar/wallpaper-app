"use client";

import { loginSchema, LoginSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FingerprintIcon, LoaderIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const LoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: true,
		},
		mode: "all",
	});

	const loginHandeler = async (loginData: LoginSchemaType) => {
		console.log(loginData);
	};

	return (
		<form
			onSubmit={handleSubmit(loginHandeler)}
			className="grid gap-4"
			noValidate>
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
							autoComplete="current-password"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Controller
				name="rememberMe"
				control={control}
				render={({ field, fieldState }) => (
					<Field
						data-invalid={fieldState.invalid}
						orientation="horizontal">
						<Checkbox
							id={field.name}
							name={field.name}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
						<FieldLabel htmlFor={field.name}>Remember Me</FieldLabel>

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
						<FingerprintIcon /> Login
					</>
				)}
			</Button>
		</form>
	);
};

export default LoginForm;
