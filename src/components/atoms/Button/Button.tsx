import clsx from "clsx";
import React from "react";
import WithChildren from "../../../utils/prop-utils/with-children.interface";

enum ButtonVariant {
  outlined,
  contained,
  text,
}

enum ButtonColor {
  primary,
  default,
  google,
}

const colorVariantMap: Record<ButtonColor, Record<ButtonVariant, string>> = {
  [ButtonColor.default]: {
    [ButtonVariant.contained]: "",
    [ButtonVariant.outlined]: "border-gray-600 text-gray-600",
    [ButtonVariant.text]: "",
  },
  [ButtonColor.google]: {
    [ButtonVariant.contained]: "",
    [ButtonVariant.outlined]: "border-red-600 text-red-600",
    [ButtonVariant.text]: "",
  },
  [ButtonColor.primary]: {
    [ButtonVariant.contained]: "",
    [ButtonVariant.outlined]: "",
    [ButtonVariant.text]: "border-green-600 text-green-600",
  },
};

export interface ButtonProps extends WithChildren {
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  color = ButtonColor.default,
  className,
  variant = ButtonVariant.outlined,
  ...rest
}: ButtonProps): JSX.Element {
  const buttonClassName = clsx(
    className,
    "px-4 py-2 rounded border",
    colorVariantMap[color][variant]
  );
  return (
    <button {...rest} className={buttonClassName}>
      {children}
    </button>
  );
}
Button.color = ButtonColor;
Button.variant = ButtonVariant;
