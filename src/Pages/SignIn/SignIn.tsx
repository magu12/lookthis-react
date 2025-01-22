import signInImage from "./Assets/newspapers.webp";
import logo from "../../Assets/Images/logo.svg";
import { SignInForm } from "../../Components/SignInForm/SignInForm";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export const SignIn = () => {
  const { width } = useWindowDimensions();

  return (
    <main className="sign-in">
      {width > 768 && (
        <img src={signInImage} alt="abstract background" className="sign-in-image" />
      )}
      <section className="content">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">lookthis</div>
        </div>
        <h1>Log in to your account</h1>
        <p>Welcome back! Please enter your details.</p>
        
        <SignInForm />
      </section>
    </main>
  );
};
