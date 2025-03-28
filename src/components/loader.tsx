import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex  justify-center px-3 ">
      <div className="relative">
        <div className="w-8 h-8 border-t-4 border-blue-800 bg-white border-solid rounded-full animate-spin"></div>
        
      </div>
    </div>
  );
};

export default Loader;