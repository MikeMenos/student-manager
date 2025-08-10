"use client";
import AddTherapist from "@/components/add-therapist";
import SelectTherapistRole from "@/components/selectors/select-therapist-role";
import { DataTable } from "@/components/shared/data-table";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDebounce } from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetAllTherapists } from "@/hooks/use-therapists";
import { SessionType } from "@/types/attendance.type";
import { TherapistCreationResponse } from "@/types/therapistType";
import { Plus, Search } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { getUsersColumns } from "./get-user-columns";

export default function Users() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [therapistRole, setTherapistRole] = useState<SessionType>();
  const [isStudentFormOpen, setIsStudentFormOpen] = useState(false);

  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const columns = useMemo(() => getUsersColumns(), []);
  const debouncedFilter = useDebounce(userSearchInput, 800);

  const {
    allTherapists,
    isAllTherapistsError,
    isAllTherapistsLoading,
    isAllTherapistsRefetching,
    refetchAllTherapists,
  } = useGetAllTherapists({
    filter: debouncedFilter,
  });

  const handleSearchStudentInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSearchInput(e.target.value);
  };

  return (
    <>
      <header
        className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 fixed top-0 z-10 ${
          isMobile ? "w-full" : ""
        }`}
        style={
          !isMobile
            ? state === "expanded"
              ? { width: `calc(100vw - ${SIDEBAR_WIDTH})` }
              : { width: `calc(100vw - ${SIDEBAR_WIDTH_ICON})` }
            : undefined
        }
      >
        <div className="flex items-center gap-4 px-5 h-14">
          <SidebarTrigger />
          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by therapist name, role..."
                className="pl-8"
                value={userSearchInput}
                onChange={handleSearchStudentInput}
              />
            </div>
          </div>
          <Dialog open={isStudentFormOpen} onOpenChange={setIsStudentFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Add Therapist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <SelectTherapistRole
                onSelectTherapistRole={(therapistRole) =>
                  setTherapistRole(therapistRole)
                }
              />
              <AddTherapist
                therapistRole={therapistRole}
                setTherapistRole={setTherapistRole}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-1 mt-14 p-4">
        {isAllTherapistsRefetching || isAllTherapistsLoading ? (
          <Loader />
        ) : isAllTherapistsError ? (
          <Error<TherapistCreationResponse[]>
            refetchData={refetchAllTherapists}
          />
        ) : (
          <DataTable columns={columns} data={allTherapists ?? []} />
        )}
      </main>
    </>
  );
}
