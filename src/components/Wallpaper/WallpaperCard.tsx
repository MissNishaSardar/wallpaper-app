import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../shadcnui/card";

const WallpaperCard = () => {
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
          src={"https://placehold.co/368x207/png"}
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
