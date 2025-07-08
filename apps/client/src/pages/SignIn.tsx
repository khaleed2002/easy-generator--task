import { Link } from "react-router-dom";
import { InputField } from "../features/authentication/components/InputField";
import { PasswordField } from "../features/authentication/components/PasswordField";
import { SubmitBtn } from "../features/authentication/components";
import { useSignInForm } from "../features/authentication/hooks";

export const SignIn = () => {
  const { form, errors, isLoading, handleChange, handleSubmit } =
    useSignInForm();

  return (
    <div className="w-[20rem] sm:w-[25rem] mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign In
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

        <PasswordField
          name="password"
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          disabled={isLoading}
        />
        {errors.signIn && (
          <p className="text-red-500 text-sm mt-1">{errors.signIn}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/auth/forgot-password"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <SubmitBtn label="Sign In" isLoading={isLoading} />

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/auth/sign-up"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
