import React from "react";
import { useState } from "react";

const Filter = ({ upfilterText }) => {
  const options = ["All Notes", "Business", "Personal", "Important"];
  const optionvalues = ["", "BUSINESS", "PERSONAL", "IMPORTANT"];
  const [filterText, setFilterText] = useState("");
  const handleFilterText = (val) => {
    setFilterText(val);
    upfilterText(val);
  };

  return (
    <div className="w-[500px] mx-auto py-5">
      <select
        className="w-full h-[50px] border border-gray-300 rounded-md px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Default select example"
        onChange={(e) => handleFilterText(e.target.value)}
      >
        {options.map((option, index) => (
          <option value={optionvalues[index]} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
