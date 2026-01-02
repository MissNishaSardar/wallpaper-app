import { Button } from "../shadcnui/button";

const LogoutButton = () => {
	return (
		<Button
			type="button"
			variant={"destructive"}
			className="cursor-pointer">
			Logout
		</Button>
	);
};

export default LogoutButton;
