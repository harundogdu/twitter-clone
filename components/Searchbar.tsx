import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Searchbar = () => {
  return (
    <div className="pl-2">
      <div className=" w-[21rem] h-12 bg-custom-lightBlack mt-2 ml-8 rounded-full flex justify-start items-center">
        <RiSearchLine className="ml-5 text-custom-lightGray" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit rounded-full pl-3 focus:border-none focus:outline-none text-custom-white"
        />
      </div>
    </div>
  );
};

export default Searchbar;
