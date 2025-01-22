import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

interface ForgotPasswordFormProps {
  onSubmit: (values: { email: string; }) => void;
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form className="form forgot-password-form" onSubmit={formik.handleSubmit}>
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.errors.email}
        touched={formik.touched.email}
      />
      <Button type="submit">
        Submit
      </Button>
    </form>
  );
};
