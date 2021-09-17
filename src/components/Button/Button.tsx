import { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
