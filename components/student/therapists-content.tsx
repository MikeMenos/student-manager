import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookHeart, Mail, Users } from "lucide-react";
import { StudentT } from "@/types/student.type";

export default function TherapistContent({
  singleStudent,
}: {
  singleStudent: StudentT;
}) {
  if (singleStudent.therapists?.length === 0)
    return (
      <p className="text-muted-foreground text-sm">
        No therapists assigned to {singleStudent.firstName}{" "}
        {singleStudent.lastName} yet.
      </p>
    );
  return (
    <div className="grid gap-4">
      {singleStudent.therapists?.map((therapist, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {therapist.therapistName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookHeart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{therapist.therapistRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{therapist.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
