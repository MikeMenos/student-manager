import { useGetSingleStudent } from "@/hooks/use-student";
import { Student } from "@/types/student";
import { Building } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AttendanceContent } from "./attendance-content";
import DeleteStudent from "./delete-student";
import StudentForm from "./forms/student-form";
import RelationsContent from "./relations-content";
import Error from "./shared/error";
import Loader from "./shared/loader";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function StudentDetails({
  studentId,
  setSelectedStudent,
}: {
  studentId: string;
  setSelectedStudent: Dispatch<SetStateAction<string>>;
}) {
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);
  const { singleStudent, isSingleStudentLoading, isSingleStudentError } =
    useGetSingleStudent(studentId);
  if (isSingleStudentLoading) return <Loader />;
  if (isSingleStudentError) return <Error<Student> />;
  if (!singleStudent) return null;

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
            <DeleteStudent
              singleStudent={singleStudent}
              setSelectedStudent={setSelectedStudent}
            />
          </div>
        </div>
        <Tabs defaultValue="Relations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="Relations">Relations</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="Relations" className="space-y-4">
            <RelationsContent singleStudent={singleStudent} />
          </TabsContent>
          <TabsContent value="attendance" className="space-y-4">
            <AttendanceContent
              studentName={`${singleStudent.firstName} ${singleStudent.lastName}`}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
