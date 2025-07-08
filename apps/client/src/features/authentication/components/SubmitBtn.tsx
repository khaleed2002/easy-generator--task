import { LoaderCircle } from "lucide-react";

type SubmitBtnProps = {
  label: string;
  isLoading: boolean;
};
export const SubmitBtn = ({ isLoading, label }: SubmitBtnProps) => {
  return (
    <button
      type="submit"
      className="w-full text-center flex justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition outline-none border-none"
    >
      {isLoading ? (
        <LoaderCircle color="white" className=" animate-spin" />
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitBtn;
