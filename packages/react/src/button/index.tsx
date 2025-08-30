import styles from "./button.module.css";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button data-slot="button" className={buttonClasses} {...props} />;
}
