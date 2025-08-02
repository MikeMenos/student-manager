import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Phone, Users } from "lucide-react";
import { StudentT } from "@/types/student.type";

export default function RelationsContent({
  singleStudent,
}: {
  singleStudent: StudentT;
}) {
  return (
    <div className="grid gap-4">
      {singleStudent.parentInfo.map((parent, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {parent.parentName} ({parent.relation})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{parent.phone}</span>
              </div>
              {parent.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{parent.email}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
