import { FormSelectProps } from "../../models/inputs";

export const FormSelect: React.FC<FormSelectProps> = ({
  labelFor,
  label,
  inputTestId,
  name,
  options,
  required,
  register,
}) => {
  return (
    <label htmlFor={labelFor} data-testid="formLabel">
      {label}
      <div className="selectDropdown">
        <select
          {...register(name, { required: required })}
          defaultValue={"Essentials"}
          data-testid={inputTestId}
        >
          {options.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </label>
  );
};
