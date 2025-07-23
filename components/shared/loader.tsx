import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <FallingLines
        color="#000"
        width="100"
        visible={true}
        aria-label="falling-circles-loading"
      />
    </div>
  );
};

export default Loader;
