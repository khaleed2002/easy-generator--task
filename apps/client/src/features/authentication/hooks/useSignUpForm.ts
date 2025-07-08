import { useState } from "react";

import { useAuth } from "../../../hooks";
import { signUpSchema, SignUpSchema } from "../services";

export const useSignUpForm = () => {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<SignUpSchema>({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpSchema, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error and API error when user starts typing
    if (errors[name as keyof SignUpSchema]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignUpSchema, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignUpSchema;
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
      await signUp({
        email: form.email,
        password: form.password,
        name: form.name,
      });
    } catch (error: any) {
      // Handle different types of errors and show under email field
      if (error.response?.status === 409) {
        setErrors((prev) => ({
          ...prev,
          email:
            "An account with this email already exists. Please try signing in instead.",
        }));
      } else if (error.response?.status === 400) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid input. Please check your information and try again.",
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
