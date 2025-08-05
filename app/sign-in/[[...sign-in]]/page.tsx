import { SignIn } from "@clerk/nextjs";
import { Fade } from "react-awesome-reveal";

export default function Page() {
  return (
    <Fade>
      <div className="flex justify-center items-center mt-8">
        <SignIn />
      </div>
    </Fade>
  );
}
