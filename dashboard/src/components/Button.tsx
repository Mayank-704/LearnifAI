import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  return (
    <button
      {...props}
      className={`
        ${variant === "default" ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-transparent text-gray-600 hover:text-gray-800"}
        px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400
        ${className}
      `}
    />
  );
};
