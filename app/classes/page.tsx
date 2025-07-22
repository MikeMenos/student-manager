"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  Plus,
  Search,
  Clock,
  MapPin,
  GraduationCap,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const classes = [
    {
      id: 1,
      name: "Mathematics 5A",
      grade: "5th Grade",
      teacher: "Ms. Sarah Johnson",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      students: 28,
      capacity: 30,
      room: "Room 201",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      subject: "Mathematics",
      description:
        "Advanced mathematics covering fractions, decimals, and basic geometry.",
      status: "active",
    },
    {
      id: 2,
      name: "English Literature 6B",
      grade: "6th Grade",
      teacher: "Mr. David Chen",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      students: 25,
      capacity: 28,
      room: "Room 105",
      schedule: "Tue, Thu - 10:30 AM",
      subject: "English",
      description:
        "Reading comprehension, creative writing, and literary analysis.",
      status: "active",
    },
    {
      id: 3,
      name: "Science Explorers K",
      grade: "Kindergarten",
      teacher: "Ms. Emily Rodriguez",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      students: 20,
      capacity: 22,
      room: "Room 301",
      schedule: "Daily - 2:00 PM",
      subject: "Science",
      description:
        "Introduction to basic scientific concepts through hands-on experiments.",
      status: "active",
    },
    {
      id: 4,
      name: "Art & Creativity 3A",
      grade: "3rd Grade",
      teacher: "Ms. Lisa Thompson",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      students: 22,
      capacity: 25,
      room: "Art Studio",
      schedule: "Mon, Wed - 1:00 PM",
      subject: "Art",
      description:
        "Developing creativity through various art mediums and techniques.",
      status: "active",
    },
    {
      id: 5,
      name: "Physical Education 4B",
      grade: "4th Grade",
      teacher: "Coach Mike Wilson",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      students: 30,
      capacity: 35,
      room: "Gymnasium",
      schedule: "Tue, Thu - 11:00 AM",
      subject: "Physical Education",
      description:
        "Building physical fitness and teamwork through sports and activities.",
      status: "active",
    },
    {
      id: 6,
      name: "Music Fundamentals 2A",
      grade: "2nd Grade",
      teacher: "Ms. Anna Martinez",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      students: 18,
      capacity: 20,
      room: "Music Room",
      schedule: "Mon, Fri - 3:00 PM",
      subject: "Music",
      description:
        "Introduction to music theory, rhythm, and basic instruments.",
      status: "active",
    },
  ];

  const subjects = [
    "All Subjects",
    "Mathematics",
    "English",
    "Science",
    "Art",
    "Physical Education",
    "Music",
  ];

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch =
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade =
      selectedGrade === "all" || classItem.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });

  const getSubjectColor = (subject: string) => {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-800",
      English: "bg-green-100 text-green-800",
      Science: "bg-purple-100 text-purple-800",
      Art: "bg-pink-100 text-pink-800",
      "Physical Education": "bg-orange-100 text-orange-800",
      Music: "bg-yellow-100 text-yellow-800",
    };
    return (
      colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getCapacityStatus = (students: number, capacity: number) => {
    const percentage = (students / capacity) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Classes</h1>
          <p className="text-muted-foreground">
            Manage classes, schedules, and assignments
          </p>
        </div>
        <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>
                Add a new class to the school system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="className">Class Name</Label>
                  <Input id="className" placeholder="e.g., Mathematics 5A" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="pe">Physical Education</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="k">Kindergarten</SelectItem>
                      <SelectItem value="1">1st Grade</SelectItem>
                      <SelectItem value="2">2nd Grade</SelectItem>
                      <SelectItem value="3">3rd Grade</SelectItem>
                      <SelectItem value="4">4th Grade</SelectItem>
                      <SelectItem value="5">5th Grade</SelectItem>
                      <SelectItem value="6">6th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Class Capacity</Label>
                  <Input id="capacity" type="number" placeholder="30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Ms. Sarah Johnson</SelectItem>
                      <SelectItem value="david">Mr. David Chen</SelectItem>
                      <SelectItem value="emily">Ms. Emily Rodriguez</SelectItem>
                      <SelectItem value="lisa">Ms. Lisa Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="room">Room</Label>
                  <Input id="room" placeholder="e.g., Room 201" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Class description..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddClassOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddClassOpen(false)}>
                Create Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Class Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((sum, c) => sum + c.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Class Size
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                classes.reduce((sum, c) => sum + c.students, 0) / classes.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">Students per class</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Capacity Usage
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (classes.reduce((sum, c) => sum + c.students, 0) /
                  classes.reduce((sum, c) => sum + c.capacity, 0)) *
                  100
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Overall utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
          <CardDescription>
            View and manage all classes in your school
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes or teachers..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="K">Kindergarten</SelectItem>
                <SelectItem value="1st">1st Grade</SelectItem>
                <SelectItem value="2nd">2nd Grade</SelectItem>
                <SelectItem value="3rd">3rd Grade</SelectItem>
                <SelectItem value="4th">4th Grade</SelectItem>
                <SelectItem value="5th">5th Grade</SelectItem>
                <SelectItem value="6th">6th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((classItem) => (
              <Card
                key={classItem.id}
                className="hover:shadow-md transition-shadow justify-between"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {classItem.name}
                      </CardTitle>
                      <CardDescription>{classItem.grade}</CardDescription>
                    </div>
                    <Badge className={getSubjectColor(classItem.subject)}>
                      {classItem.subject}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={classItem.teacherAvatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {classItem.teacher
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{classItem.teacher}</p>
                      <p className="text-xs text-muted-foreground">Teacher</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span
                        className={getCapacityStatus(
                          classItem.students,
                          classItem.capacity
                        )}
                      >
                        {classItem.students}/{classItem.capacity} students
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{classItem.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{classItem.schedule}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
