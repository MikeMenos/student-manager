import { Mail, Phone, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { useGetSingleStudent } from "@/hooks/use-student";
import Loader from "./shared/loader";
import Error from "./shared/error";
import { Student } from "@/types/student";
import StudentForm from "./forms/student-form";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteStudent from "./delete-student";

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
              {/* <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">
              Attendance: {singleStudent.attendance}
              </span>
              </div> */}
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
        <Tabs defaultValue="parents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="medicalHistory">Medical History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="parents" className="space-y-4">
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
          </TabsContent>
          {/* <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Daily Note</CardTitle>
                <CardDescription>
                  Record observations about the student`s day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="note-type">Note Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select note type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="behavior">Behavior</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note-content">Note</Label>
                  <Textarea
                    studentId="note-content"
                    placeholder="Enter your observations about the student..."
                    rows={3}
                  />
                </div>
                <Button>Add Note</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">Academic</Badge>
                      <span className="text-xs text-muted-foreground">
                        Today, 2:30 PM
                      </span>
                    </div>
                    <p className="text-sm">{singleStudent.todayNotes}</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">Social</Badge>
                      <span className="text-xs text-muted-foreground">
                        Yesterday, 11:15 AM
                      </span>
                    </div>
                    <p className="text-sm">
                      Worked well in group activities during art class. Showed
                      good collaboration skills.
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">Behavior</Badge>
                      <span className="text-xs text-muted-foreground">
                        2 days ago, 9:45 AM
                      </span>
                    </div>
                    <p className="text-sm">
                      Needed gentle reminder to raise hand before speaking.
                      Improved throughout the day.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* <TabsContent value="progress" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Mathematics</span>
                        <span className="text-sm font-medium">A</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Reading</span>
                        <span className="text-sm font-medium">A-</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Science</span>
                        <span className="text-sm font-medium">B+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
