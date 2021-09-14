import { FC } from 'react';

interface ButtonProps {
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
