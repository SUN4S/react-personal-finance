import "./FormInput.scss";

import { FieldErrors, FieldValues } from "react-hook-form";

import { Children } from "react";

type InputType = "text" | "password" | "email" | "number";

interface InputProps {
  labelFor: string;
  label: string;
  name?: string;
  required?: boolean;
  type?: InputType;
  step?: number;
  placeholder?: string;
  register?: any;
  children?: JSX.Element;
}

export const FormInput: React.FC<InputProps> = ({
  labelFor,
  label,
  name,
  required,
  type,
  step,
  placeholder,
  register,
  children,
}) => {
  return (
    <label htmlFor={labelFor}>
      {label}
      {children ? (
        children
      ) : (
        <input
          type={type}
          step={step}
          {...register(name, { required: required })}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};
