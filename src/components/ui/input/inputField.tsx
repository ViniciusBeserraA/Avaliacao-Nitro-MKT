import React from 'react';
import './inputField.css';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out ${
          disabled ? 'disabled:opacity-50 disabled:pointer-events-none' : ''
        }`}
        disabled={disabled}
      />
      {error && <span id={`${id}-error`} className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputField;
