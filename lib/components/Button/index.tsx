import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children = 'Clique aqui',
  onClick,
  className = '',
}) => {
  // Sem preflight, o botão precisa neutralizar sozinho os estilos nativos do
  // navegador (borda, fonte e cursor).
  const baseClasses =
    'mui:inline-flex mui:items-center mui:justify-center mui:rounded-md mui:border mui:font-sans mui:font-medium mui:cursor-pointer mui:transition-colors mui:focus-visible:outline-none mui:focus-visible:ring-2 mui:focus-visible:ring-blue-500 mui:focus-visible:ring-offset-2 mui:disabled:opacity-50 mui:disabled:pointer-events-none';

  const variantClasses = {
    primary:
      'mui:border-transparent mui:bg-blue-600 mui:text-white mui:hover:bg-blue-700',
    secondary:
      'mui:border-transparent mui:bg-gray-100 mui:text-gray-900 mui:hover:bg-gray-200',
    outline:
      'mui:border-gray-300 mui:bg-transparent mui:text-gray-900 mui:hover:bg-gray-50',
    ghost:
      'mui:border-transparent mui:bg-transparent mui:text-gray-900 mui:hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'mui:h-8 mui:px-3 mui:text-sm',
    md: 'mui:h-10 mui:px-4 mui:py-2 mui:text-base',
    lg: 'mui:h-12 mui:px-6 mui:text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
