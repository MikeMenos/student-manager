"use client";

import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import StudentDetails from "@/components/student-details";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetAllStudents } from "@/hooks/use-student";
import { centerOptions } from "@/lib/utils";
import { Student } from "@/types/student";
import { Building, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import StudentForm from "../../components/forms/student-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectCenter from "@/components/shared/select-center";

export default function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentSearchInput, setStudentSearchInput] = useState("");
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const centerValues = centerOptions.map((g) => g.value);
  const isGradeFilter = filter === "all" || centerValues.includes(filter);
  const debounceDelay = isGradeFilter ? 0 : 800;

  const debouncedFilter = useDebounce(filter, debounceDelay);
  const {
    allStudents,
    isAllStudentsError,
    isAllStudentsLoading,
    isAllStudentsRefetching,
    refetchAllStudents,
  } = useGetAllStudents({
    offset: undefined,
    filter: filter === "all" ? "" : debouncedFilter,
  });

  const handleSearchStudentInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setStudentSearchInput(e.target.value);
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14">
        <div className="flex items-center gap-4 px-6 h-14">
          <SidebarTrigger />
          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, grade, age, or parent..."
                className="pl-8"
                value={studentSearchInput}
                onChange={handleSearchStudentInput}
              />
            </div>
          </div>
          <StudentForm
            isStudentFormOpen={isStudentFormOpen}
            setIsStudentFormOpen={setIsStudentFormOpen}
          />
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="grid h-full lg:grid-cols-[350px_1fr]">
          <div className="border-r bg-muted/10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">
                  Students{" "}
                  {allStudents?.length ? `(${allStudents?.length})` : ""}
                </h2>
                <SelectCenter onSelectCenter={(center) => setFilter(center)} />
              </div>
              {isAllStudentsLoading || isAllStudentsRefetching ? (
                <Loader />
              ) : isAllStudentsError ? (
                <Error<Student[]> refetchData={refetchAllStudents} />
              ) : allStudents && allStudents.length > 0 ? (
                <div className="space-y-2">
                  {allStudents.map((student) => (
                    <Card
                      key={student.id}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedStudent === student.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedStudent(student.id!)}
                    >
                      <CardContent className="p-3 relative">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {student.firstName.split("")[0]}
                              {student.lastName.split("")[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">
                                {student.firstName} {student.lastName}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {student.grade} • Age {student.age}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                              <Building size={15} />
                              {student.center}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No students found.
                </p>
              )}
            </div>
          </div>
          {selectedStudent && (
            <StudentDetails
              studentId={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            />
          )}
        </div>
      </main>
    </>
  );
}
