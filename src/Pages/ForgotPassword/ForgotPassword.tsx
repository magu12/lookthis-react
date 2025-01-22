import { useState } from "react";
import forgotPasswordImage from "./Assets/newspapers.webp";
import logo from "../../Assets/Images/logo.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { ForgotPasswordForm } from "../../Components/ForgotPasswordForm/ForgotPasswordForm";
import { Icons } from "../../Components/Icons/Icons";
import { Button } from "../../Components/Button/Button";
import { authApi } from "../../api/auth";
import { useAlert } from "../../contexts/AlertContext";

export const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { width } = useWindowDimensions();
  const { showAlert } = useAlert();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await authApi.resetPassword(values);
      setIsSuccess(true);
      showAlert("Password reset instructions have been sent to your email", "success");
    } catch (error: any) {
      showAlert(
        error.response?.data?.message || "Failed to send reset instructions. Please try again.", 
        "error"
      );
    }
  };
 
  return (
    <main className="forgot-password">
      {width > 768 && (
        <img src={forgotPasswordImage} alt="abstract background" className="bg-image" />
      )}
      <section className="content">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">lookthis</div>
        </div>

        {isSuccess ? (
          <>
            <div className="success-icon">{Icons.Success}</div>
            <h1>Check your email</h1>
            <p>
              We have sent password reset instructions to your email.
              Please check your inbox.
            </p>
            <Button variant="link" to="/sign-in">
              Back to Sign in
            </Button>
          </>
        ) : (
          <>
            <h1>Forgot Password?</h1>
            <p>Enter your email address, and we'll send you instructions to reset your password.</p>

            <ForgotPasswordForm onSubmit={handleSubmit} />
          </>
        )}
      </section>
    </main>
  );
};
