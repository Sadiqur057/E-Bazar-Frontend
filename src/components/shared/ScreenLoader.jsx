import React from "react";
import Loader from "../ui/Loader";

const ScreenLoader = () => {
  return (
    <div className=" min-h-[calc(100vh-200px)] flex items-center w-full justify-center">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
