import { serverEnv } from "@/lib/env/serverEnv";
import Image from "next/image";
import { WallpaperGetPayload } from "../../../generated/prisma/models";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../shadcnui/card";

type WallpaperCardProps = {
  info: WallpaperGetPayload<{
    include: {
      uploadedBy: {
        select: {
          name: true;
          image: true;
        };
      };
    };
  }>;
};

const WallpaperCard = ({ info }: WallpaperCardProps) => {
  return (
    <Card>
      <CardHeader className="grid-cols-4 content-center">
        <div className="col-span-3 flex items-center gap-4">
          <Avatar>
            <AvatarImage src={`${serverEnv.CDN_URL}${info.uploadedBy.image}`} />
            <AvatarFallback>
              {info.uploadedBy.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="">{info.uploadedBy.name}</div>
        </div>
        <div className="col-span-1">Delete button</div>
      </CardHeader>

      <CardContent>
        <Image
          src={`${serverEnv.CDN_URL}${info.image}`}
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
