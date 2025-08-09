import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { AttendanceT } from "@/types/attendance.type";
import { updateFormField, formatToDDMMYYYY } from "@/lib/helpers";
import { useCreateAttendance } from "@/hooks/use-attendance";
import { useUser } from "@clerk/nextjs";

export const initialSessionFormState: AttendanceT = {
  sessionDate: new Date(),
  sessionType: "Occupational",
  sessionDuration: 1,
  therapistId: "",
};

type AttendanceFormProps = {
  studentId: string;
  studentName: string;
  formData?: AttendanceT;
};

export default function AttendanceForm({
  studentId,
  studentName,
  formData,
}: AttendanceFormProps) {
  const isEdit = !!formData?.id;
  const { user } = useUser();
  const [form, setForm] = useState<AttendanceT>(initialSessionFormState);
  const [isOpen, setIsOpen] = useState(false);
  console.log(user);

  const { createAttendanceMutation, isCreateAttendanceLoading } =
    useCreateAttendance();

  const handleOnClose = () => {
    setForm(initialSessionFormState);
    setIsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAttendanceMutation(
      {
        ...form,
        studentId,
        sessionDate: formatToDDMMYYYY(form.sessionDate),
        therapistId: user?.id,
      },
      { onSuccess: handleOnClose }
    );
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      // sessionType: user?.therapistRole,
    }));
  }, []);

  useEffect(() => {
    if (formData) {
      setForm(formData);
    }
  }, [formData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> {isEdit ? "Edit" : "Add"} Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add New"} Session</DialogTitle>
            <DialogDescription>
              {isEdit ? "Edit" : "Add a new"} therapy session for {studentName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sessionDate">Date</Label>
                <Input
                  id="sessionDate"
                  type="date"
                  value={
                    form.sessionDate instanceof Date
                      ? form.sessionDate.toISOString().split("T")[0]
                      : new Date(form.sessionDate).toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setForm(
                      updateFormField(
                        form,
                        "sessionDate",
                        new Date(e.currentTarget.value)
                      )
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sessionType">Session Type</Label>
                <Input id="sessionType" value={form.sessionType} disabled />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sessionDuration">Duration (h)</Label>
                <Input
                  required
                  id="sessionDuration"
                  value={form.sessionDuration}
                  onChange={(e) =>
                    setForm(
                      updateFormField(
                        form,
                        "sessionDuration",
                        Number(e.currentTarget.value)
                      )
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="therapist">Therapist</Label>
                <Input
                  id="therapist"
                  placeholder="Therapist name"
                  value={user!.username ?? ""}
                  disabled
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleOnClose} type="button">
              Cancel
            </Button>
            <Button disabled={isCreateAttendanceLoading} type="submit">
              Add Session
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
