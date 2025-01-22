import { Link } from 'react-router-dom';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'button' | 'link';
  to?: string;
}


export const Button = ({ children, variant = 'button', to = '', ...props }: ButtonProps) => {
  if (variant === 'button') {
    return (
      <button {...props} className={`btn ${props.className || ''}`}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={`btn ${props.className || ''}`}>
      {children}
    </Link>
  );
};
