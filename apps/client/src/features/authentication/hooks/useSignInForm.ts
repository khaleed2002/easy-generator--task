import { useState } from "react";
import { useAuth } from "../../../hooks";
import { signInSchema, SignInSchema } from "../services";
interface SignInErrors extends SignInSchema {
  signIn: string;
}
export const useSignInForm = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<SignInSchema>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInErrors, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name as keyof SignInErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const result = signInSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignInSchema, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignInSchema;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signIn({
        email: form.email,
        password: form.password,
      });
    } catch (error: any) {
      // Handle different types of errors
      if (error.response?.status === 401) {
        // Invalid credentials - show error on both fields for security
        setErrors((prev) => ({
          ...prev,
          signIn: error?.response?.data?.message || "Invalid Credentials",
        }));
      } else if (error.response?.status === 404) {
        setErrors((prev) => ({
          ...prev,
          email: "No account found with this email",
        }));
      } else if (error.response?.status === 429) {
        setErrors((prev) => ({
          ...prev,
          email: "Too many attempts. Please try again later.",
        }));
      } else if (error.response?.status === 403) {
        setErrors((prev) => ({
          ...prev,
          email: "Account is locked. Please contact support.",
        }));
      } else if (error.response?.status >= 500) {
        setErrors((prev) => ({
          ...prev,
          email: "Server error. Please try again later.",
        }));
      } else if (error.message) {
        setErrors((prev) => ({ ...prev, email: error.message }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "An unexpected error occurred. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};
