import { ChangeEvent, FC } from 'react';

interface TextareaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<TextareaProps> = ({ onChange, value }) => {
  return (
    <textarea
      onChange={onChange}
      value={value}
    />
  );
};

export default Textarea;
