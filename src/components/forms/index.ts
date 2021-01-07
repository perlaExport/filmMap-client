import LoginForm from "./Login/Login";
import RegisterForm from "./Register/Register";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

export type FormSceneNames = "Login" | "Register" | "Forgot Password" | "Close";

export interface FormProps {
  changeSceneHandler: (type: FormSceneNames, delay: number) => void;
}

export interface RegistrationSuccessProps {
  email: string;
  changeFormSceneToLogin: () => void;
}

export { LoginForm, RegisterForm, ForgotPassword };
