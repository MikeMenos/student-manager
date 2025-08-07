import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useCreateAttendance } from "@/hooks/use-attendance";
import { formatToDDMMYYYY, updateFormField } from "@/lib/helpers";
import { AttendanceT } from "@/types/attendance.type";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

type AttendanceCardHeaderProps = {
  studentName: string;
  studentId: string;
};

export const initialSessionFormState: AttendanceT = {
  sessionDate: new Date(),
  sessionType: "Occupational",
  sessionDuration: 1,
  therapistId: "",
};

export default function AttendanceCardHeader({
  studentName,
  studentId,
}: AttendanceCardHeaderProps) {
  const { user } = useUser();
  const [form, setForm] = useState<AttendanceT>(initialSessionFormState);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const { createAttendanceMutation, isCreateAttendanceLoading } =
    useCreateAttendance();

  const handleOnCloseAttendanceForm = () => {
    setForm(initialSessionFormState);
    setIsAddSessionOpen(false);
  };

  const handleCreateStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAttendanceMutation(
      {
        ...form,
        studentId,
        sessionDate: formatToDDMMYYYY(form.sessionDate),
        therapistId: user?.id,
      },
      { onSuccess: handleOnCloseAttendanceForm }
    );
  };
  return (
    <CardHeader className="flex items-center justify-between">
      <div>
        <CardTitle>Attendance for {studentName}</CardTitle>
        <CardDescription>
          Select a date to view session details.
        </CardDescription>
      </div>
      <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-1" /> Add Session
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleCreateStudent}>
            <DialogHeader>
              <DialogTitle>Add New Session</DialogTitle>
              <DialogDescription>
                Add a new therapy session for {studentName}
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
              <Button
                variant="outline"
                onClick={handleOnCloseAttendanceForm}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={isCreateAttendanceLoading} type="submit">
                Add Session
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </CardHeader>
  );
}
