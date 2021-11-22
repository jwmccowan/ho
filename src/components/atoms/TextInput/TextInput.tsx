import clsx from "clsx";
import * as React from "react";

export interface TextInputProps {
  className?: string;
  error?: boolean;
  placeholder?: string;
  type?: "email" | "text" | "password";
  value?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className: originalClassName, error, ...rest }: TextInputProps,
    ref
  ): JSX.Element => {
    const className = clsx(
      originalClassName,
      error && "border-red-400",
      !error && "border-gray-400",
      "rounded border flex-grow px-4 py-2 rounded-lg border"
    );
    return <input {...rest} className={className} ref={ref} />;
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
