export interface FormInputProps {
  labelFor: string;
  label?: string;
  name?: string;
  inputTestId?: string;
  required?: boolean;
  type?: "text" | "password" | "email" | "number";
  step?: number;
  placeholder?: string;
  register?: any;
  children?: JSX.Element;
}

export interface FormSelectProps {
  labelFor: string;
  label: string;
  name: string;
  inputTestId: string;
  options: Array<string>;
  required: boolean;
  placeholder?: string;
  register: any;
}

export interface FormTextareaProps {
  labelFor: string;
  label: string;
  name: string;
  inputTestId: string;
  required: boolean;
  placeholder?: string;
  register: any;
}
