"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  FileText,
  Plus,
  Edit2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "cancelled" | "rescheduled";
  sessionType: string;
  therapist: string;
  startTime: string;
  endTime: string;
  duration: number;
  notes?: string;
  goals?: string[];
  nextSession?: string;
}

interface AttendanceCalendarProps {
  studentName: string;
}

export function AttendanceContent({ studentName }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<AttendanceRecord | null>(null);

  // Sample attendance data - in a real app, this would come from your database
  const attendanceData: Record<string, AttendanceRecord> = {
    "2024-01-03": {
      date: "2024-01-03",
      status: "present",
      sessionType: "Speech Therapy",
      therapist: "Dr. Sarah Johnson",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      duration: 45,
      notes:
        "Great progress with articulation exercises. Student was engaged throughout the session.",
      goals: ["Improve /r/ sound production", "Increase vocabulary"],
      nextSession: "2024-01-10",
    },
    "2024-01-10": {
      date: "2024-01-10",
      status: "present",
      sessionType: "Speech Therapy",
      therapist: "Dr. Sarah Johnson",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      duration: 45,
      notes:
        "Continued work on /r/ sounds. Student showed improvement in structured activities.",
      goals: ["Improve /r/ sound production", "Increase vocabulary"],
      nextSession: "2024-01-17",
    },
    "2024-01-17": {
      date: "2024-01-17",
      status: "absent",
      sessionType: "Speech Therapy",
      therapist: "Dr. Sarah Johnson",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      duration: 45,
      notes: "Student was sick. Session rescheduled to 2024-01-19.",
      nextSession: "2024-01-19",
    },
    "2024-01-19": {
      date: "2024-01-19",
      status: "present",
      sessionType: "Speech Therapy",
      therapist: "Dr. Sarah Johnson",
      startTime: "2:00 PM",
      endTime: "2:45 PM",
      duration: 45,
      notes:
        "Make-up session. Good focus and participation. Practiced /r/ in conversation.",
      goals: ["Improve /r/ sound production", "Increase vocabulary"],
      nextSession: "2024-01-24",
    },
    "2024-01-24": {
      date: "2024-01-24",
      status: "present",
      sessionType: "Speech Therapy",
      therapist: "Dr. Sarah Johnson",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      duration: 45,
      notes:
        "Excellent session! Student successfully used /r/ sounds in spontaneous speech.",
      goals: ["Improve /r/ sound production", "Increase vocabulary"],
      nextSession: "2024-01-31",
    },
    "2024-01-31": {
      date: "2024-01-31",
      status: "cancelled",
      sessionType: "Speech Therapy",
      therapist: "Dr. Sarah Johnson",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      duration: 45,
      notes:
        "Therapist unavailable due to emergency. Session rescheduled to 2024-02-02.",
      nextSession: "2024-02-02",
    },
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "cancelled":
        return "bg-gray-500";
      case "rescheduled":
        return "bg-yellow-500";
      default:
        return "bg-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-green-100 text-green-800",
      absent: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
      rescheduled: "bg-yellow-100 text-yellow-800",
    };
    return (
      variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(dateKey);
    const session = attendanceData[dateKey];
    if (session) {
      setSelectedSession(session);
    }
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calculate monthly statistics
  const monthlyStats = Object.values(attendanceData).filter((record) => {
    const recordDate = new Date(record.date);
    return (
      recordDate.getMonth() === currentMonth &&
      recordDate.getFullYear() === currentYear
    );
  });

  const presentSessions = monthlyStats.filter(
    (s) => s.status === "present"
  ).length;
  const totalSessions = monthlyStats.length;
  const attendanceRate =
    totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Monthly Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sessions Attended
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {presentSessions}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (monthlyStats
                  .filter((s) => s.status === "present")
                  .reduce((sum, s) => sum + s.duration, 0) /
                  60) *
                  10
              ) / 10}
              h
            </div>
            <p className="text-xs text-muted-foreground">Therapy time</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                <CardDescription>
                  Click on a date to view session details
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Dialog
                  open={isAddSessionOpen}
                  onOpenChange={setIsAddSessionOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Session</DialogTitle>
                      <DialogDescription>
                        Add a new therapy session for {studentName}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="sessionDate">Date</Label>
                          <Input id="sessionDate" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="sessionType">Session Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="speech">
                                Speech Therapy
                              </SelectItem>
                              <SelectItem value="occupational">
                                Occupational Therapy
                              </SelectItem>
                              <SelectItem value="physical">
                                Physical Therapy
                              </SelectItem>
                              <SelectItem value="behavioral">
                                Behavioral Therapy
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input id="startTime" type="time" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input id="endTime" type="time" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="therapist">Therapist</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select therapist" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sarah">
                                Dr. Sarah Johnson
                              </SelectItem>
                              <SelectItem value="mike">
                                Dr. Mike Chen
                              </SelectItem>
                              <SelectItem value="lisa">
                                Dr. Lisa Rodriguez
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddSessionOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddSessionOpen(false)}>
                        Add Session
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="p-2" />;
                }

                const dateKey = formatDateKey(currentYear, currentMonth, day);
                const session = attendanceData[dateKey];
                const isSelected = selectedDate === dateKey;

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative p-2 text-sm rounded-md transition-colors hover:bg-muted
                      ${isSelected ? "bg-blue-100 text-blue-900" : ""}
                      ${session ? "font-medium" : ""}
                    `}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{day}</span>
                      {session && (
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            session.status
                          )}`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Session Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Session Details
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? `Details for ${new Date(selectedDate).toLocaleDateString()}`
                : "Select a date to view session details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedSession ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusBadge(selectedSession.status)}>
                    {selectedSession.status.charAt(0).toUpperCase() +
                      selectedSession.status.slice(1)}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditSessionOpen(true)}
                  >
                    <Edit2 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Session Type</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedSession.sessionType}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm">Therapist</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedSession.therapist}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm">Time</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.startTime} - {selectedSession.endTime}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Duration</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.duration} minutes
                      </p>
                    </div>
                  </div>

                  {selectedSession.goals && (
                    <div>
                      <h4 className="font-medium text-sm">Session Goals</h4>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {selectedSession.goals.map((goal, index) => (
                          <li key={index}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedSession.notes && (
                    <div>
                      <h4 className="font-medium text-sm">Notes</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.notes}
                      </p>
                    </div>
                  )}

                  {selectedSession.nextSession && (
                    <div>
                      <h4 className="font-medium text-sm">Next Session</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          selectedSession.nextSession
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Click on a date in the calendar to view session details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Session Dialog */}
      <Dialog open={isEditSessionOpen} onOpenChange={setIsEditSessionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
            <DialogDescription>
              Update session details for{" "}
              {selectedDate && new Date(selectedDate).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          {selectedSession && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select defaultValue={selectedSession.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editStartTime">Start Time</Label>
                  <Input id="editStartTime" type="time" defaultValue="10:00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editEndTime">End Time</Label>
                  <Input id="editEndTime" type="time" defaultValue="10:45" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editNotes">Session Notes</Label>
                <Textarea
                  id="editNotes"
                  defaultValue={selectedSession.notes}
                  placeholder="Update session notes..."
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditSessionOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditSessionOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
