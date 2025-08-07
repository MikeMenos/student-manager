import React from "react";

export default function AttendanceForm() {
  return (
    <Dialog open={isEditSessionOpen} onOpenChange={setIsEditSessionOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Session</DialogTitle>
          <DialogDescription>
            Update session details for{" "}
            {selectedDate && selectedDate.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        {currentSession && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editStatus">Status</Label>
              <Select defaultValue={currentSession.status}>
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
                defaultValue={currentSession.notes}
                placeholder="Update session notes..."
                rows={4}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditSessionOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditSessionOpen(false)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
