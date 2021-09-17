import { FC } from 'react';

export interface IOption {
  id: string;
  title: string;
}

interface ISelectProps {
  options: IOption[];
  onChange: (option: IOption) => void;
  value: IOption | null;
}

const Select: FC<ISelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      onChange={(event) => {
        const foundOption = options.find(({ id }) => id === event.target.value)!;

        onChange(foundOption);
      }}
      value={value?.id}
    >
      {options.map(({ id, title }) => (
        <option key={id} value={id}>{title}</option>
      ))}
    </select>
  );
};

export default Select;
