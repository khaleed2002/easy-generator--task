import React from "react";
import { CheckCircleIcon } from ".";
import { CloseCircleIcon } from ".";

interface NameRequirementsProps {
  name: string;
}

export const NameRequirements: React.FC<NameRequirementsProps> = ({ name }) => {
  const isValid = name.length >= 3;

  return (
    <ul className="text-xs mt-1 mb-4 pl-5">
      <li className="flex items-center gap-1">
        {isValid ? <CheckCircleIcon /> : <CloseCircleIcon />}
        <span className={isValid ? "text-green-600" : "text-gray-500"}>
          At least 3 characters
        </span>
      </li>
    </ul>
  );
};
