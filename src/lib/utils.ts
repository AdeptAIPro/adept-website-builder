
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMatchScoreColor = (score: number): string => {
  if (score >= 90) return 'text-accent';
  if (score >= 80) return 'text-primary';
  if (score >= 70) return 'text-amber-500';
  return 'text-muted-foreground';
};

export const getMatchScoreBackground = (score: number): string => {
  if (score >= 90) return 'bg-accent';
  if (score >= 80) return 'bg-primary';
  if (score >= 70) return 'bg-amber-500';
  return 'bg-muted-foreground';
};
