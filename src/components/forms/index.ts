import LoginForm from "./Login/Login";
import RegisterForm from "./Register/Register";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResendLink from "./ResendLink/ResendLink";

export type FormSceneNames = "Login" | "Register" | "Forgot Password" | "Close" | "Resend Link";

export interface FormProps {
  changeSceneHandler: (type: FormSceneNames, delay: number) => void;
}

export interface RegistrationSuccessProps {
  email: string;
  changeFormSceneToLogin: () => void;
}

export { LoginForm, RegisterForm, ForgotPassword, ResendLink };
