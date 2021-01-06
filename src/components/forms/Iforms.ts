export type FormSceneNames = "Login" | "Register" | "Forgot Password" | "Close";

export interface FormProps {
  changeSceneHandler: (type: FormSceneNames, delay: number) => void;
}

export interface RegistrationSuccessProps {
  email: string;
  changeFormSceneToLogin: () => void;
}
