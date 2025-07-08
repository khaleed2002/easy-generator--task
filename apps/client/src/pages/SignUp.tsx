import { Link } from "react-router-dom";
import { InputField } from "../features/authentication/components/InputField";
import { PasswordField } from "../features/authentication/components/PasswordField";
import {
  NameRequirements,
  PasswordRequirements,
  SubmitBtn,
} from "../features/authentication/components";
import { useSignUpForm } from "../features/authentication/hooks";

export const SignUp = () => {
  const { form, errors, isLoading, handleChange, handleSubmit } =
    useSignUpForm();

  return (
    <div className="w-[20rem] sm:w-[25rem] mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign Up
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type="email"
          name="email"
          id="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />

        <div>
          <InputField
            type="text"
            name="name"
            id="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
            disabled={isLoading}
          />
          <NameRequirements name={form.name} />
        </div>

        <div>
          <PasswordField
            name="password"
            id="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
            disabled={isLoading}
          />
          <PasswordRequirements password={form.password} />
        </div>

        <SubmitBtn label="Sign Up" isLoading={isLoading} />

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/sign-in"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
