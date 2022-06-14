import "./FormTextarea.scss";

interface InputProps {
  labelFor: string;
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
  register: any;
}

export const FormTextarea: React.FC<InputProps> = ({
  labelFor,
  label,
  name,
  required,
  placeholder,
  register,
}) => {
  return (
    <label htmlFor={labelFor}>
      {label}
      <textarea
        {...register(name, { required: required })}
        placeholder={placeholder}
      />
    </label>
  );
};
