import { clientEnv } from "@/lib/env/clientEnv";
import { formatDistanceToNow } from "date-fns";
import { DownloadIcon } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { WallpaperGetPayload } from "../../../generated/prisma/models";
import DeleteButton from "../Buttons/DeleteButton";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import { Badge } from "../shadcnui/badge";
import { Button } from "../shadcnui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../shadcnui/card";

type WallpaperCardProps = {
  info: WallpaperGetPayload<{
    include: {
      uploadedBy: {
        select: {
          id: true;
          name: true;
          image: true;
        };
      };
      tags: {
        select: {
          slug: true;
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
            <AvatarImage
              src={`${clientEnv.NEXT_PUBLIC_CDN_URL}${info.uploadedBy.image}`}
            />
            <AvatarFallback>
              {info.uploadedBy.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <div className="">{info.uploadedBy.name}</div>
            <div className="text-foreground/50 text-xs">
              {formatDistanceToNow(info.createdAt, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <DeleteButton
            uploaderId={info.uploadedBy.id}
            walllpaperId={info.id}
            walllpaperName={info.image}
          />
        </div>
      </CardHeader>

      <CardContent>
        <Image
          src={`${clientEnv.NEXT_PUBLIC_CDN_URL}${info.image}`}
          alt=""
          className="h-auto w-auto object-contain"
          height={360}
          width={640}
        />
      </CardContent>

      <CardFooter className="justify-between">
        <div className="space-x-3">
          {info.tags.map(({ slug }) => (
            <Badge
              key={slug}
              variant="secondary">
              {slug.toLowerCase()}
            </Badge>
          ))}
        </div>

        <Link
          href={`${clientEnv.NEXT_PUBLIC_CDN_URL}${info.image}` as Route}
          className=""
          target="_blank"
          download={true}>
          <Button>
            <DownloadIcon />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WallpaperCard;
