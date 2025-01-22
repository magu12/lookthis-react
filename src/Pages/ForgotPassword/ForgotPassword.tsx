import forgotPasswordImage from "./Assets/forgot-pass-img.webp";
import logo from "../../Assets/Images/logo.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { ForgotPasswordForm } from "../../Components/ForgotPasswordForm/ForgotPasswordForm";
import { useState } from "react";
import { Icons } from "../../Components/Icons/Icons";
import { Button } from "../../Components/Button/Button";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { width } = useWindowDimensions();

  const handleSubmit = (values: { email: string; }) => {
    console.log(values);
    // TODO: Handle form submission here
    setIsSuccess(true);
  };

  return (
    <main className="forgot-password">
      {width > 768 && (
        <img src={forgotPasswordImage} alt="abstract background" className="bg-image" />
      )}
      <section className="content">

        {isSuccess ? (
          <>
            {Icons.Success}
            <h1>Password reset</h1>
            <p>
              Your password has been successfully reset. Click below
              to sign in.
            </p>
            <Button variant="link" to="/sign-in">
              Go to Sign in
            </Button>
          </>
        ) : (
          <>
            <img src={logo} alt="logo" className="logo" />
            <h1>Forgot Your Password?</h1>
            <p>Enter your email address, and we’ll send you instructions to reset your password.</p>

            <ForgotPasswordForm onSubmit={handleSubmit} />
            <Link className="back-to" to="/sign-in">
              Back to Sign in
            </Link>
          </>
        )}
      </section>
    </main>
  );
};
