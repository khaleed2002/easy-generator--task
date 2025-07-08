import React from "react";
import { CheckCircleIcon } from ".";
import { CloseCircleIcon } from ".";

interface PasswordRequirementsProps {
  password: string;
}

const requirements = [
  {
    test: (password: string) => password.length >= 8,
    text: "At least 8 characters",
  },
  {
    test: (password: string) => /[a-zA-Z]/.test(password),
    text: "At least one letter",
  },
  {
    test: (password: string) => /[0-9]/.test(password),
    text: "At least one number",
  },
  {
    test: (password: string) => /[^a-zA-Z0-9]/.test(password),
    text: "At least one special character",
  },
];

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
}) => {
  return (
    <ul className="text-xs mt-1 mb-6 pl-5">
      {requirements.map((req, index) => {
        const isValid = req.test(password);
        return (
          <li key={index} className="flex items-center gap-1">
            {isValid ? <CheckCircleIcon /> : <CloseCircleIcon />}
            <span className={isValid ? "text-green-600" : "text-gray-500"}>
              {req.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
