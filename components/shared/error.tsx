import { CircleX, RefreshCcw } from "lucide-react";

import { QueryObserverResult } from "@tanstack/react-query";
import { Button } from "../ui/button";

interface IErrorProps<T> {
  message?: string;
  refetchData?: () => Promise<QueryObserverResult<T, Error>>;
}

const Error = <T,>({ message, refetchData }: IErrorProps<T>) => {
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center text-xl">
      <CircleX color="red" size={30} />
      {message ?? "Something went wrong."}
      <Button onClick={refetchData}>
        Try Again <RefreshCcw />{" "}
      </Button>
    </div>
  );
};

export default Error;
