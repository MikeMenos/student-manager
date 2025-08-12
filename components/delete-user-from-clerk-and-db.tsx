import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { TherapistCreationResponseT } from "@/types/therapistType";
import { useDeleteClientFromClerkAndDb } from "@/hooks/use-therapists";

export default function DeleteUserFromClerkAndDbButton({
  rowData,
}: {
  rowData: TherapistCreationResponseT;
}) {
  const {
    deleteUserFromClerkAndDbMutation,
    isDeleteUserFromClerkAndDbLoading,
  } = useDeleteClientFromClerkAndDb();

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <p>Delete</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {rowData.therapistName}</DialogTitle>
          <DialogDescription className="pt-3">
            Are you sure you want to delete{" "}
            <span className="font-bold text-lg">{rowData.therapistName}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() =>
              deleteUserFromClerkAndDbMutation({
                clerkUserId: rowData.therapistId,
                dbUserId: rowData.id,
              })
            }
            disabled={isDeleteUserFromClerkAndDbLoading}
          >
            {isDeleteUserFromClerkAndDbLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
