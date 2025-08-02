import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Pencil, Plus } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import SelectCenter from "../shared/select-center";

type StudentFormProps = {
  isStudentFormOpen: boolean;
  setIsStudentFormOpen: Dispatch<SetStateAction<boolean>>;
  selectedStudent?: Student;
};

export const initialStudentFormState: Student = {
  id: undefined,
  firstName: "",
  lastName: "",
  age: "",
  grade: "",
  homeAddress: "",
  school: "",
  center: "",
  parentInfo: [
    {
      parentName: "",
      email: "",
      phone: "",
      relation: "",
    },
  ],
};

export default function StudentForm({
  isStudentFormOpen,
  setIsStudentFormOpen,
  selectedStudent,
}: StudentFormProps) {
  const [form, setForm] = useState<Student>(initialStudentFormState);
  const { createStudentMutation, isCreateStudentLoading } = useCreateStudent();

  const handleCreateStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createStudentMutation(form, { onSuccess: handleOnCloseStudentForm });
  };

  useEffect(() => {
    if (selectedStudent && isStudentFormOpen) {
      setForm(selectedStudent);
    }
  }, [selectedStudent, isStudentFormOpen]);

  const handleOnCloseStudentForm = () => {
    setIsStudentFormOpen(false);
    setForm(initialStudentFormState);
  };

  return (
    <Dialog open={isStudentFormOpen} onOpenChange={setIsStudentFormOpen}>
      <DialogTrigger asChild>
        <Button>
          {selectedStudent ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}

          {selectedStudent ? `Edit` : "Add Student"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={(e) => handleCreateStudent(e)}>
          <DialogHeader>
            <DialogTitle className="mb-4">
              {selectedStudent
                ? `Edit ${selectedStudent.firstName} ${selectedStudent.lastName}`
                : "Register new student"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={form?.firstName}
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
                  value={form?.lastName}
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
                  value={form?.grade}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  min={0}
                  type="number"
                  placeholder="Enter age"
                  value={form?.age}
                  onChange={(e) =>
                    setForm(updateFormField(form, "age", e.currentTarget.value))
                  }
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                placeholder="Enter school"
                value={form?.school}
                onChange={(e) =>
                  setForm(
                    updateFormField(form, "school", e.currentTarget.value)
                  )
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="homeAddress">Address</Label>
              <Input
                id="homeAddress"
                placeholder="Enter home address"
                value={form?.homeAddress}
                onChange={(e) =>
                  setForm(
                    updateFormField(form, "homeAddress", e.currentTarget.value)
                  )
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="relation">Center</Label>
              <SelectCenter
                onSelectCenter={(center) =>
                  setForm(updateFormField(form, "center", center))
                }
                hasAllCenterOption={false}
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
                          phone: "",
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
              <Fragment key={item.id}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="parentName">Parent Name</Label>
                    <Input
                      id="parentName"
                      placeholder="Enter parent name"
                      value={item?.parentName}
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
                      value={item?.relation}
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
                      value={item?.phone}
                      onChange={(e) => {
                        setForm(
                          updateFormField(
                            form,
                            `parentInfo[${idx}].phone`,
                            e.currentTarget.value
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
                      value={item?.email}
                      onChange={(e) =>
                        setForm(
                          updateFormField(
                            form,
                            `parentInfo[${idx}].email`,
                            e.currentTarget.value
                          )
                        )
                      }
                    />
                  </div>
                </div>
                <Separator />
              </Fragment>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleOnCloseStudentForm}
              disabled={isCreateStudentLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isCreateStudentLoading} type="submit">
              {selectedStudent ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
