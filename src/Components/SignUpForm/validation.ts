import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Please confirm your password"),
  avatar: Yup.mixed<File>()
    .test("fileSize", "File is too large", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5000000;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return value instanceof File && ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),
});

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
} 