import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCreateStudent } from "@/hooks/use-student";
import { useGetAllTherapists } from "@/hooks/use-therapists";
import { updateFormField } from "@/lib/helpers";
import { StudentT } from "@/types/student.type";
import { useUser } from "@clerk/nextjs";
import { Pencil, Plus } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SelectCenter from "../selectors/select-center";
import SelectGrade from "../selectors/select-grade";
import SelectTherapist from "../selectors/select-therapist";
import { Option } from "../ui/multi-select";

type StudentFormProps = {
  isStudentFormOpen: boolean;
  setIsStudentFormOpen: Dispatch<SetStateAction<boolean>>;
  selectedStudent?: StudentT;
};

export const initialStudentFormState: StudentT = {
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
  therapists: [],
};

export default function StudentForm({
  isStudentFormOpen,
  setIsStudentFormOpen,
  selectedStudent,
}: StudentFormProps) {
  const [form, setForm] = useState<StudentT>(initialStudentFormState);
  const [selected, setSelected] = useState<Option[]>([]);
  const [filter, setFilter] = useState("");

  const { user } = useUser();
  const { createStudentMutation, isCreateStudentLoading } = useCreateStudent();
  const { allTherapists } = useGetAllTherapists({
    filter,
  });

  const role = (user?.publicMetadata?.role as string) || "";

  const handleCreateStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createStudentMutation(form, { onSuccess: handleOnCloseStudentForm });
  };

  const handleOnCloseStudentForm = () => {
    setIsStudentFormOpen(false);
    setForm(initialStudentFormState);
  };

  useEffect(() => {
    if (selectedStudent && isStudentFormOpen) {
      setForm(selectedStudent);
    }
  }, [selectedStudent, isStudentFormOpen]);

  useEffect(() => {
    if (form.therapists && form.therapists.length > 0) {
      setSelected(
        form.therapists.map((therapist) => ({
          label: `${therapist.therapistName} (${therapist.therapistRole})`,
          value: therapist.id,
          therapistName: therapist.therapistName,
          therapistRole: therapist.therapistRole,
          center: therapist.center,
          phone: therapist.phone,
          therapistId: therapist.therapistId,
          email: therapist.email,
        }))
      );
    }
  }, [form.therapists]);

  const therapistOptions: Option[] = allTherapists?.length
    ? allTherapists.map((t) => ({
        label: `${t.therapistName} (${t.therapistRole})`,
        value: t.id,
        therapistName: t.therapistName,
        therapistRole: t.therapistRole,
        center: t.center,
        phone: t.phone,
        therapistId: t.therapistId,
        email: t.email,
      }))
    : [];

  const handleTherapistSelect = (therapists: Option[]) => {
    setSelected(therapists);
    setForm({
      ...form,
      therapists: therapists.map((t) => ({
        id: t.value,
        therapistName: t.therapistName,
        therapistRole: t.therapistRole,
        center: t.center,
        phone: t.phone,
        therapistId: t.therapistId,
        email: t.email,
      })),
    });
  };

  return (
    <Dialog open={isStudentFormOpen} onOpenChange={setIsStudentFormOpen}>
      {role === "admin" && (
        <DialogTrigger asChild>
          <Button>
            {selectedStudent ? (
              <Pencil className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}

            {selectedStudent ? `` : "Add student"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[85%] overflow-y-auto">
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
                onSelectCenter={(center) => {
                  setForm(updateFormField(form, "center", center));
                  setFilter(center);
                }}
                hasAllCenterOption={false}
                value={form.center}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="relation">Therapists</Label>
              <SelectTherapist
                onTherapistSelect={handleTherapistSelect}
                value={selected}
                options={therapistOptions}
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
              <Fragment key={idx}>
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
