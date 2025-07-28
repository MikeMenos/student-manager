import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectGrade from "../shared/select-grade";
import { Student } from "@/types/student";
import { updateFormField } from "@/lib/helpers";
import { useCreateStudent } from "@/hooks/use-student";

export const initialStudentFormState: Student = {
  firstName: "",
  lastName: "",
  age: "",
  grade: "",
  homeAddress: "",
  school: "",
  id: undefined,
  parentInfo: [
    {
      parentName: "",
      email: "",
      phone: null,
      relation: "",
    },
  ],
};

export default function StudentForm() {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [form, setForm] = useState<Student>(initialStudentFormState);
  const { createStudentMutation, isCreateStudentLoading } = useCreateStudent(
    form,
    setForm,
    setIsAddStudentOpen
  );

  const handleCreateStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createStudentMutation();
  };

  return (
    <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={(e) => handleCreateStudent(e)}>
          <DialogHeader>
            <DialogTitle>Register New Student</DialogTitle>
            <DialogDescription>
              Add a new student to the school management system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  onChange={(e) =>
                    setForm(
                      updateFormField(form, "firstName", e.currentTarget.value)
                    )
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  onChange={(e) =>
                    setForm(
                      updateFormField(form, "lastName", e.currentTarget.value)
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade</Label>
                <SelectGrade
                  onSelectGrade={(grade) =>
                    setForm(updateFormField(form, "grade", grade))
                  }
                  hasAllGradesOption={false}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  min={0}
                  type="number"
                  placeholder="Enter age"
                  onChange={(e) =>
                    setForm(updateFormField(form, "age", e.currentTarget.value))
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="homeAddress">Address</Label>
              <Input
                id="homeAddress"
                placeholder="Enter home address"
                onChange={(e) =>
                  setForm(
                    updateFormField(form, "homeAddress", e.currentTarget.value)
                  )
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                placeholder="Enter school"
                onChange={(e) =>
                  setForm(
                    updateFormField(form, "school", e.currentTarget.value)
                  )
                }
                required
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Parent/Guardian Information</h4>
              {form.parentInfo.length <= 1 && (
                <Button
                  onClick={() =>
                    setForm({
                      ...form,
                      parentInfo: [
                        ...form.parentInfo,
                        {
                          parentName: "",
                          email: "",
                          phone: null,
                          relation: "",
                        },
                      ],
                    })
                  }
                >
                  Add Parent/Guardian
                </Button>
              )}
            </div>
            {form.parentInfo.map((item, idx) => (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="parentName">Parent Name</Label>
                    <Input
                      id="parentName"
                      placeholder="Enter parent name"
                      onChange={(e) => {
                        setForm(
                          updateFormField(
                            form,
                            `parentInfo[${idx}].parentName`,
                            e.currentTarget.value
                          )
                        );
                      }}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="relation">Relation</Label>
                    <Select
                      onValueChange={(value) => {
                        setForm(
                          updateFormField(
                            form,
                            `parentInfo[${idx}].relation`,
                            value
                          )
                        );
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Guardian">Guardian</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="number"
                      placeholder="Enter phone number"
                      min={0}
                      onChange={(e) => {
                        setForm(
                          updateFormField(
                            form,
                            `parentInfo[${idx}].phone`,
                            Number(e.currentTarget.value)
                          )
                        );
                      }}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      onChange={(e) =>
                        setForm(
                          updateFormField(
                            form,
                            `parentInfo[${idx}].email`,
                            e.currentTarget.value
                          )
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <Separator />
              </>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddStudentOpen(false)}
              disabled={isCreateStudentLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isCreateStudentLoading} type="submit">
              Register Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
