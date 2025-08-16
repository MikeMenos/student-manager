import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSession } from "@/hooks/use-session";
import { useGetAllTherapists } from "@/hooks/use-therapists";
import {
  formatToDDMMYYYY,
  parseDDMMYYYYToDate,
  parseInputDateString,
  toInputDateString,
  updateFormField,
} from "@/lib/helpers";
import { SessionT } from "@/types/session.type";
import { useUser } from "@clerk/nextjs";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Textarea } from "../ui/textarea";

export const initialSessionFormState: SessionT = {
  sessionDate: new Date(),
  sessionType: "Occupational",
  sessionDuration: 1,
  therapistId: "",
  sessionNotes: "",
};

type AttendanceFormProps = {
  studentId: string;
  studentName: string;
  formData?: SessionT;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  selectedDate?: Date;
};

export default function SessionForm({
  studentId,
  studentName,
  formData,
  isOpen,
  setIsOpen,
  isEdit,
  setIsEdit,
  selectedDate,
}: AttendanceFormProps) {
  const { user } = useUser();
  const [form, setForm] = useState<SessionT>(initialSessionFormState);

  const { createSessionMutation, isCreateSessionLoading } = useCreateSession();
  const { allTherapists } = useGetAllTherapists({
    filter: "",
  });
  const loggedInTherapist = allTherapists?.find(
    (therapist) => therapist.therapistId === user?.id
  );
  const handleOnClose = () => {
    setForm(initialSessionFormState);
    setIsOpen(false);
    if (setIsEdit) {
      setIsEdit(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSessionMutation(
      {
        ...form,
        studentId,
        sessionDate: formatToDDMMYYYY(form.sessionDate),
      },
      { onSuccess: handleOnClose }
    );
  };

  useEffect(() => {
    if (!formData && !isEdit) {
      setForm(() => ({
        ...form,
        sessionDate: selectedDate as Date,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    if (formData && isEdit) {
      setForm(formData);
    }
  }, [formData, isEdit]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-2xl"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
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
                  value={toInputDateString(
                    form.sessionDate instanceof Date
                      ? form.sessionDate
                      : parseDDMMYYYYToDate(form.sessionDate as string)
                  )}
                  onChange={(e) =>
                    setForm(
                      updateFormField(
                        form,
                        "sessionDate",
                        // keep Date in state
                        parseInputDateString(e.currentTarget.value) as Date
                      )
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sessionType">Session Type</Label>
                <Input
                  id="sessionType"
                  value={loggedInTherapist?.therapistRole}
                  disabled
                />
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
                        e.currentTarget.value
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
                  value={loggedInTherapist?.therapistName}
                  disabled
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sessionNotes">Notes</Label>
              <Textarea
                id="sessionNotes"
                value={form.sessionNotes}
                onChange={(e) =>
                  setForm(
                    updateFormField(form, "sessionNotes", e.currentTarget.value)
                  )
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleOnClose} type="button">
              Cancel
            </Button>
            <Button disabled={isCreateSessionLoading} type="submit">
              {isEdit ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
