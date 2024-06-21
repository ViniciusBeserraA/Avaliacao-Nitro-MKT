import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  isLoading,
  disabled,
  type = 'button',
  children, 
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-700 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <span id="submitBtnLoading" className="inline-block align-middle">
          <svg
            id="submitBtnLoadingSvg"
            className="animate-spin h-5 w-5 text-white inline-block align-middle mr-2 mb-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
              stroke="currentColor"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V1.5a.5.5 0 011 0V4h2.5a.5.5 0 010 1H13v2.5a.5.5 0 01-1 0V5h-2a.5.5 0 010-1h2v2.5a.5.5 0 01-1 0V3.67A8.001 8.001 0 014 12z"
            ></path>
          </svg>
        </span>
      )}
      <span id="submitBtnText" className="inline-block align-middle">{children}</span>
    </button>
  );
};

export default Button;
