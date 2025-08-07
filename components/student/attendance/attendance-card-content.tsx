import TileCardWrapper from "@/components/shared/tile-card-wrapper";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSingleStudent } from "@/hooks/use-student";
import { formatToDDMMYYYY } from "@/lib/helpers";
import { CalendarIcon, Clock, FileText } from "lucide-react";
import { useState } from "react";

type AttendanceCardContentProps = {
  studentId: string;
};

export default function AttendanceCardContent({
  studentId,
}: AttendanceCardContentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { singleStudent, isSingleStudentLoading, isSingleStudentError } =
    useGetSingleStudent(studentId, selectedDate);

  return (
    <CardContent>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
        <Card className="h-fit w-full">
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
              className="rounded-md border shadow w-full"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Session Details
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? `Details for ${formatToDDMMYYYY(selectedDate)}`
                : "Select a date to view session details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate &&
            singleStudent?.attendances &&
            singleStudent?.attendances[0]?.sessionDuration ? (
              <TileCardWrapper>
                <div className={`p-6`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Session Duration</h2>
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold mr-2">
                      {singleStudent?.attendances[0].sessionDuration}
                    </span>
                    <span className="text-gray-600">
                      hours with {singleStudent.firstName}{" "}
                      {singleStudent.lastName}
                    </span>
                  </div>
                </CardContent>
              </TileCardWrapper>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  {selectedDate
                    ? "No session scheduled for this date"
                    : "Select a date in the calendar to view session details"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
}
