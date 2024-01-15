import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { data } from "@/components/RouletteWheel/data";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrder = (option: string): number | null => {
  const index = data.findIndex((item) => item.option === option.toString());
  return index !== -1 ? index : null; // Adding 1 because array indices are zero-based
};
