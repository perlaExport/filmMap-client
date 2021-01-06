import LoadingButton from "./LoadingButton/LoaingButton";
import NavButton from "./NavButton/NavButton";
import IconButton from "./IconButton/IconButton";

export interface IconButtonProps extends React.ComponentProps<"button"> {
  icon: React.ReactNode;
  classes?: string;
}

export interface LoadingButtonProps extends React.ComponentProps<"button"> {
  classes?: string;
  isLoading: boolean;
}

export interface NavButtonProps extends React.ComponentProps<"button"> {
  classes?: string;
  username?: string;
}

export { LoadingButton, NavButton, IconButton };
