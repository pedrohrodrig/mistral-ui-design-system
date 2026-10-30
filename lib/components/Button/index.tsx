import { Button as BaseButton } from '@base-ui/react/button';

import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseButton.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
  ghost: 'bg-transparent hover:bg-gray-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 text-lg',
};

/**
 * Botão do Mistral UI construído sobre o primitive `Button` do Base UI.
 *
 * Aceita todas as props do Base UI (`render`, `focusableWhenDisabled`,
 * `className` como função do estado, etc.) além de `variant` e `size`.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children = 'Clique aqui',
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size]);

  return (
    <BaseButton
      {...props}
      className={state =>
        cn(
          classes,
          typeof className === 'function' ? className(state) : className
        )
      }
    >
      {children}
    </BaseButton>
  );
}
