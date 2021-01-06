import Input from "./Input";

export interface InputProps extends React.ComponentProps<"input"> {
  classes?: string;
  label?: string;
  error?: string | null;
}

export default Input;
