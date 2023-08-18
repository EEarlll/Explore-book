import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full mx-auto rounded-lg border-solid bg-primary">
      <div className="flex justify-center items-center h-full">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
    </div>
  );
};

export default Loading;
