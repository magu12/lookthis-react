import './Input.scss';
import { Icons } from '../Icons/Icons';
import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

export const Input = ({ label, error, touched, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{label}</label>
      <div className="input-wrapper">
        <input 
          {...props} 
          className={touched && error ? 'error' : ''}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        />
        {type === 'password' && (
          <button 
            type="button" 
            className="password-toggle" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? Icons.HiddenPassword : Icons.ShownPassword}
          </button>
        )}
      </div>
      {touched && error && <div className="error">{error}</div>}
    </div>
  );
};
