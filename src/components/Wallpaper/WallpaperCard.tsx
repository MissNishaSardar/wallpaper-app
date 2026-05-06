import { serverEnv } from "@/lib/env/serverEnv";
import Image from "next/image";
import { Wallpaper } from "../../../generated/prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "../shadcnui/card";

type WallpaperCardProps = {
  info: Wallpaper;
};

const WallpaperCard = ({ info }: WallpaperCardProps) => {
  return (
    <Card>
      <CardHeader className="grid-cols-4 content-center">
        <div className="col-span-3 flex items-center gap-4">
          <div className="">av</div>
          <div className="">user name</div>
        </div>
        <div className="col-span-1">Delete button</div>
      </CardHeader>

      <CardContent>
        <Image
          src={`${serverEnv.CDN_URL}/${info.image}`}
          alt=""
          className="h-auto w-auto object-contain"
          height={360}
          width={640}
        />
      </CardContent>

      <CardFooter className="justify-between">
        <div className="">Tags</div>
        <div className="">Download button</div>
      </CardFooter>
    </Card>
  );
};

export default WallpaperCard;
