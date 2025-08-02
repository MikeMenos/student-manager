"use client";

import { useState } from "react";
import { CalendarIcon, FileText, Plus, Edit2 } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<AttendanceRecord | null>(null);

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

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Attendance for {studentName}</CardTitle>
          <CardDescription>
            Select a date to view or add session details.
          </CardDescription>
        </div>
        <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" /> Add Session
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
                  <Input id="sessionType" placeholder="e.g. Speech Therapy" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sessionDuration">Duration (h)</Label>
                  <Input id="sessionDuration" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="therapist">Therapist</Label>
                  <Input id="therapist" placeholder="Therapist name" />
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
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border shadow"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> Session Details
              </CardTitle>
              <CardDescription>
                {selectedDate
                  ? `Details for ${selectedDate.toLocaleDateString()}`
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
                      <Edit2 className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </div>
                  {/* Additional session info... */}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Select a date to view session details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
