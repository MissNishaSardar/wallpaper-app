"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "../shadcnui/button";

const LoginDashboardButton = () => {
	const { data } = authClient.useSession();

	if (data) {
		return (
			<Button asChild>
				<Link href={"/studio"}>Studio</Link>
			</Button>
		);
	}

	return (
		<Button asChild>
			<Link href={"/auth"}>Login</Link>
		</Button>
	);
};

export default LoginDashboardButton;
