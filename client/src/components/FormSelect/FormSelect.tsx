interface InputProps {
  labelFor: string;
  label: string;
  name: string;
  options: Array<string>;
  required: boolean;
  placeholder?: string;
  register: any;
}

export const FormSelect: React.FC<InputProps> = ({
  labelFor,
  label,
  name,
  options,
  required,
  register,
}) => {
  return (
    <label htmlFor={labelFor}>
      {label}
      <div className="selectDropdown">
        <select {...register(name, { required: required })}>
          {options.map((item, index) => {
            return (
              <option value={item} selected={index == 0 && true}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </label>
  );
};
