"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInviteTherapist } from "@/hooks/use-invitation";
import { SessionType } from "@/types/attendance.type";
import { Dispatch, SetStateAction, useState } from "react";

export default function AddTherapist({
  therapistRole,
  setTherapistRole,
}: {
  therapistRole?: SessionType;
  setTherapistRole: Dispatch<SetStateAction<SessionType | undefined>>;
}) {
  const [userEmail, setUserEmail] = useState("");

  const { addTherapistMutation, isAddTherapistLoading } = useInviteTherapist(
    userEmail,
    setUserEmail,
    therapistRole!
  );
  return (
    <>
      <Input
        type="email"
        placeholder="Enter therapist's email..."
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
      <Button
        onClick={() => addTherapistMutation()}
        disabled={isAddTherapistLoading || !userEmail || !therapistRole}
        className="mt-8"
      >
        Add Therapist
      </Button>
    </>
  );
}
