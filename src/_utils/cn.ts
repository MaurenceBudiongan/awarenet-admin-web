import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...args: Parameters<typeof clsx>) {
  return twMerge(clsx(args));
}
