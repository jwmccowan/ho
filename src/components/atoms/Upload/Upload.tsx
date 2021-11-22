import { forwardRef } from "react";

export interface UploadProps {
  name: string;
  disabled?: boolean;
  accept?: string;
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(
  (props, ref) => (
    <label htmlFor={props.name}>
      <input
        type="file"
        disabled={props.disabled}
        accept={props.accept}
        name={props.name}
        id={props.name}
        style={{ display: "none" }}
        onChange={props.onChange}
        ref={ref}
      />
      {props.children}
    </label>
  )
);
Upload.displayName = "Upload";
