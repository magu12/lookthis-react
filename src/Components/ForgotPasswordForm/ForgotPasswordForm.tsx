import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

interface ForgotPasswordFormProps {
  onSubmit: (values: { email: string }) => void;
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
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
        error={formik.touched.email ? formik.errors.email : undefined}
        touched={formik.touched.email}
      />

      <Button
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Sending..." : "Reset Password"}
      </Button>

      <Link className="back-to" to="/sign-in">
        Back to Sign in
      </Link>
    </form>
  );
};
