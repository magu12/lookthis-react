import signInImage from "./Assets/newspapers.webp";
import logo from "../../Assets/Images/logo.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SignUpForm } from "../../Components/SignUpForm/SignUpForm";

export const SignUp = () => {
  const { width } = useWindowDimensions();

  return (
    <main className="sign-up">
      {width > 768 && (
        <img src={signInImage} alt="abstract background" className="sign-in-image" />
      )}
      <section className="content">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <div className="logo-text">lookthis</div>
        </div>
        <h1>Create an account</h1>
        <p>Welcome to lookthis! Please enter your details.</p>
        
        <SignUpForm />
      </section>
    </main>
  );
};
