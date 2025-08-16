import SessionForm from "@/components/forms/session-form";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { SessionT } from "@/types/session.type";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type AttendanceCardHeaderProps = {
  studentName: string;
  studentId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | undefined;
};

export const initialSessionFormState: SessionT = {
  sessionDate: new Date(),
  sessionType: "Occupational",
  sessionDuration: 1,
  therapistId: "",
  sessionNotes: "",
};

export default function SessionCardHeader({
  studentName,
  studentId,
  isOpen,
  setIsOpen,
  selectedDate,
}: AttendanceCardHeaderProps) {
  const { user } = useUser();

  const role = (user?.publicMetadata?.role as string) || "";

  return (
    <CardHeader className="flex items-center justify-between">
      <div>
        <CardDescription>
          Select a date to view session details.
        </CardDescription>
      </div>
      {role !== "admin" && (
        <>
          <Button className="px-6" onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add session
          </Button>
          <SessionForm
            studentName={studentName}
            studentId={studentId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedDate={selectedDate}
          />
        </>
      )}
    </CardHeader>
  );
}
