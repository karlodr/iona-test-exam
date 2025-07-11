import { FC } from "react";

export type BadgeProps = {
  label: string;
  variant?: "primary" | "secondary";
};

export const Badge: FC<BadgeProps> = ({ label, variant = "primary" }) => {
  return <span className={`badge badge-${variant} rounded-full`}>{label}</span>;
};
