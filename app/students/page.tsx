"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Mail, Phone, Search, Star, Users } from "lucide-react";
import { useState } from "react";
import StudentForm from "../../components/forms/student-form";
import SelectGrade from "../../components/shared/select-grade";
import { students } from "@/lib/mock-students-data";
import { Label } from "@/components/ui/label";

export default function SchoolDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button size="icon" variant="ghost">
            <Bell className="h-4 w-4" />
          </Button>
          <StudentForm />
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="grid h-full lg:grid-cols-[350px_1fr]">
          {/* Student List */}
          <div className="border-r bg-muted/10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">
                  Students ({filteredStudents.length})
                </h2>
                <SelectGrade />
              </div>
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedStudent.id === student.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">
                              {student.name}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {student.grade} • Age {student.age}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated {student.lastUpdate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedStudent.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback className="text-lg">
                    {selectedStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{selectedStudent.name}</h1>
                  <p className="text-muted-foreground">
                    {selectedStudent.grade} • Age {selectedStudent.age}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Attendance: {selectedStudent.attendance}
                    </span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="parents" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="parents">Parents</TabsTrigger>
                  <TabsTrigger value="notes">Daily Notes</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>

                <TabsContent value="parents" className="space-y-4">
                  <div className="grid gap-4">
                    {selectedStudent.parents.map((parent, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {parent.name} ({parent.relation})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{parent.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{parent.email}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="h-3 w-3 mr-1" />
                                Email
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
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
                          id="note-content"
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
                          <p className="text-sm">
                            {selectedStudent.todayNotes}
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">Social</Badge>
                            <span className="text-xs text-muted-foreground">
                              Yesterday, 11:15 AM
                            </span>
                          </div>
                          <p className="text-sm">
                            Worked well in group activities during art class.
                            Showed good collaboration skills.
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
                            Needed gentle reminder to raise hand before
                            speaking. Improved throughout the day.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
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

                    <Card>
                      <CardHeader>
                        <CardTitle>Behavioral Tracking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Participation</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">
                              Following Instructions
                            </span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((star) => (
                                <Star
                                  key={star}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                              <Star className="h-4 w-4 text-gray-300" />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Peer Interaction</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
