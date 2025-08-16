import { useGetSingleStudent } from "@/hooks/use-student";
import { StudentT } from "@/types/student.type";
import { Building } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import DeleteStudent from "./delete-student";
import StudentForm from "../forms/student-form";
import Error from "../shared/error";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import RelationsContent from "./relations-content";
import { useUser } from "@clerk/nextjs";
import TherapistContent from "./therapists-content";
import { Loader } from "../shared/loader";
import { SessionsContent } from "./session/session-card";
import AttendanceContent from "./attendance-content";

export default function StudentDetails({
  studentId,
  setSelectedStudent,
}: {
  studentId: string;
  setSelectedStudent: Dispatch<SetStateAction<string>>;
}) {
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);

  const { user } = useUser();
  const { singleStudent, isSingleStudentLoading, isSingleStudentError } =
    useGetSingleStudent(studentId, undefined);

  if (isSingleStudentLoading) return <Loader />;
  if (isSingleStudentError) return <Error<StudentT> />;
  if (!singleStudent) return null;

  const role = (user?.publicMetadata?.role as string) || "";

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6 justify-between">
          <div className="flex gap-4 items-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {singleStudent.firstName.split("")[0]}
                {singleStudent.lastName.split("")[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {singleStudent.firstName} {singleStudent.lastName}
              </h1>
              <p className="text-muted-foreground">
                {singleStudent.grade} • Age {singleStudent.age}
              </p>
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Building size={15} />
                {singleStudent.center}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StudentForm
              isStudentFormOpen={isStudentFormOpen}
              setIsStudentFormOpen={setIsStudentFormOpen}
              selectedStudent={singleStudent}
              key={singleStudent.id}
            />
            {role === "admin" && (
              <DeleteStudent
                singleStudent={singleStudent}
                setSelectedStudent={setSelectedStudent}
              />
            )}
          </div>
        </div>
        <Tabs defaultValue="Relations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="Relations">Relations</TabsTrigger>
            {role === "admin" && (
              <TabsTrigger value="therapists">Therapists</TabsTrigger>
            )}
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            {role === "admin" && (
              <TabsTrigger value="payments">Payments</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="Relations" className="space-y-4">
            <RelationsContent singleStudent={singleStudent} />
          </TabsContent>
          <TabsContent value="sessions" className="space-y-4">
            <SessionsContent
              studentName={`${singleStudent.firstName} ${singleStudent.lastName}`}
              studentId={studentId}
            />
          </TabsContent>
          <TabsContent value="attendance" className="space-y-4">
            <AttendanceContent studentId={studentId} />
          </TabsContent>
          <TabsContent value="therapists" className="space-y-4">
            <TherapistContent singleStudent={singleStudent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
