"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInviteTherapist } from "@/hooks/use-invitation";
import { SessionType } from "@/types/session.type";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import SelectCenter from "./selectors/select-center";
import SelectTherapistRole from "./selectors/select-therapist-role";
import { Label } from "./ui/label";

export default function AddTherapist({
  therapistRole,
  setTherapistRole,
}: {
  therapistRole?: SessionType;
  setTherapistRole: Dispatch<SetStateAction<SessionType | undefined>>;
}) {
  const [userEmail, setUserEmail] = useState("");
  const [center, setCenter] = useState("");
  const [phone, setPhone] = useState("");

  const resetFrom = () => {
    setUserEmail("");
    setPhone("");
    setCenter("");
    setCenter("");
  };

  const { addTherapistMutation, isAddTherapistLoading } = useInviteTherapist(
    userEmail,
    phone,
    center,
    therapistRole!,
    resetFrom
  );

  const submitTherapist = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTherapistMutation();
  };

  return (
    <form onSubmit={(e) => submitTherapist(e)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="therapistRole">Role</Label>
        <SelectTherapistRole
          onSelectTherapistRole={(therapistRole) =>
            setTherapistRole(therapistRole)
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          placeholder="Enter phone number..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="center">Therapy Center</Label>
        <SelectCenter
          hasAllCenterOption={false}
          onSelectCenter={(center) => setCenter(center)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="Enter email..."
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={
          isAddTherapistLoading || !userEmail || !therapistRole || !phone
        }
        className="mt-8"
      >
        Add Therapist
      </Button>
    </form>
  );
}
