import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const InputField: React.FC<InputProps> = ({
  label,
  error,
  ...props
}) => (
  <div className="mb-4">
    <label htmlFor={props.id || props.name} className="block mb-1 font-medium">
      {label}
    </label>
    <input
      {...props}
      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
