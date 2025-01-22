import { useFormik } from "formik";
import { Button } from "../Button/Button";
import { authApi } from "../../api/auth";
import { useAlert } from '../../contexts/AlertContext';
import { FormFields } from "./FormFields";
import { signUpValidationSchema, SignUpFormValues } from "./validation";
import { AvatarUpload } from "../AvatarUpload/AvatarUpload";
import { Link, useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await authApi.register({
          username: values.username,
          email: values.email,
          password: values.password,
          avatar: values.avatar, 
        });
        showAlert('Registration successful! Please check your email to verify your account.', 'success');
        resetForm();
        navigate('/sign-in');
      } catch (error: any) {
        showAlert(
          error.response?.data?.message || 'Registration failed. Please try again.',
          'error'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAvatarChange = (file: File) => {
    formik.setFieldValue("avatar", file);
  };

  return (
    <form className="form sign-up-form" onSubmit={formik.handleSubmit}>
      <AvatarUpload
        onAvatarChange={handleAvatarChange}
        error={formik.errors.avatar}
      />

      <FormFields formik={formik} />

      <Button type="submit" disabled={formik.isSubmitting}>
        Sign Up
      </Button>
      <Link className="back-to" to="/sign-in">
        Back to Sign In
      </Link>
    </form>
  );
};
