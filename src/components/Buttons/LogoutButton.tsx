"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shadcnui/button";

const LogoutButton = () => {
	const [isLoding, setIsLoding] = useState(false);

	const { push } = useRouter();

	const logoutHandeler = async () => {
		setIsLoding(true);

		const { error } = await authClient.signOut();

		await new Promise<void>((r) => setTimeout(r, 1000));

		if (!error) {
			console.log("Logout Successful");

			push("/auth");
		}

		setIsLoding(false);
	};

	return (
		<Button
			type="button"
			onClick={logoutHandeler}
			variant={"destructive"}
			className="cursor-pointer"
			disabled={isLoding}>
			{isLoding ? (
				<>
					<Loader2Icon className="animate-spin" /> Logging out
				</>
			) : (
				<>
					<LogOutIcon /> Logout
				</>
			)}
		</Button>
	);
};

export default LogoutButton;
