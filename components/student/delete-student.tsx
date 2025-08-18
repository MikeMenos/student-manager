import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useDeleteStudent } from "@/hooks/use-student";
import { StudentT } from "@/types/student.type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function DeleteStudent({
  singleStudent,
  setSelectedStudent,
}: {
  singleStudent?: StudentT;
  setSelectedStudent: Dispatch<SetStateAction<string>>;
}) {
  const [isStudentDeleteOpen, setIsStudentDeleteOpen] = useState(false);

  const { deleteStudentMutation, isDeleteStudentLoading } = useDeleteStudent(
    singleStudent?.id
  );

  if (!singleStudent) return null;

  const handleOnCloseStudentDeleteDialog = () => {
    setSelectedStudent("");
    setIsStudentDeleteOpen(false);
  };

  return (
    <Dialog open={isStudentDeleteOpen} onOpenChange={setIsStudentDeleteOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete {singleStudent.firstName} {singleStudent.lastName}
          </DialogTitle>
          <DialogDescription className="pt-3">
            Are you sure you want to delete{" "}
            <span className="font-bold text-lg">
              {singleStudent.firstName} {singleStudent.lastName}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() =>
              deleteStudentMutation(undefined, {
                onSuccess: handleOnCloseStudentDeleteDialog,
              })
            }
            disabled={isDeleteStudentLoading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
