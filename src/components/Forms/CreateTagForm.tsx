import { Button } from "../shadcnui/button";
import { Dialog, DialogContent, DialogTrigger } from "../shadcnui/dialog";

const CreateTagForm = () => {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="link">Missing tags? Create Now</Button>}
      />
      <DialogContent showCloseButton={false}>
        {/* <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTagForm;
