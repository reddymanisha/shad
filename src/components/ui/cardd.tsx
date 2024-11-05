import React from 'react';
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",
            "leading-tight focus:outline-none focus:shadow-outline",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-xs italic mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;