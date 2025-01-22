import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../../api/auth";
import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const SignInForm = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await authApi.login({
          email: values.email,
          password: values.password,
        });

        login(response.user);
        showAlert('Successfully logged in!', 'success');

        // Redirect to the page user tried to access or to home
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      } catch (error: any) {
        showAlert(
          error.response?.data?.message || 'Login failed. Please check your credentials.',
          'error'
        );
      } finally { 
        setSubmitting(false);
      }
    },
  });

  return (
    <form className="form sign-in-form" onSubmit={formik.handleSubmit}>
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

      <div className="form-group">
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <div className="password-header">
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>

      <Link className="back-to" to="/sign-up">
        Don't have an account? Create one
      </Link>
    </form>
  );
};
