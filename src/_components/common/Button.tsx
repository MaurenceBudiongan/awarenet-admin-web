import cn from "@/utils/cn";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "primary-outline" | "secondary-outline";
  className?: string;
}

export const Button = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) => (
  <button
    className={cn(
      className,
      "cursor-pointer rounded-md border px-4 py-2 text-white",
      variant === "primary" && "bg-blue-900 hover:bg-blue-800",
      variant === "primary-outline" &&
        "bg-white px-4 py-2 text-blue-900 hover:bg-blue-200",
      variant === "secondary" && "bg-gray-900 hover:bg-gray-800",
      variant === "secondary-outline" &&
        "bg-white px-4 py-2 text-gray-900 hover:bg-gray-200",
    )}
    {...props}
  >
    {children}
  </button>
);
