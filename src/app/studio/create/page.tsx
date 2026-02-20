import CreateWallpaperForm from "@/components/Forms/CreateWallpaperForm";
import { Card, CardHeader, CardTitle } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Wallpaper | Wallpaper App",
	description: "Create Wallpaper page of Wallpaper App",
};

const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<Card className="w-xs">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-semibold"></CardTitle>
				</CardHeader>

				<CreateWallpaperForm />
			</Card>
		</section>
	);
};

export default page;
