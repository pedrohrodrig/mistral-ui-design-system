'use client';

import { Button as BaseButton } from '@base-ui/react/button';

import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from './variants';

export type { ButtonSize, ButtonVariant };

export interface ButtonProps extends BaseButton.Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Botão do Mistral UI construído sobre o primitive `Button` do Base UI.
 *
 * Aceita todas as props do Base UI (`render`, `focusableWhenDisabled`,
 * `className` como função do estado, etc.) além de `variant` e `size`.
 * As classes são combinadas com tailwind-variants: classes `mui:` passadas em
 * `className` substituem as conflitantes do componente. Classes do Tailwind da
 * aplicação (sem prefixo) vencem pela camada CSS, já que os estilos da
 * biblioteca ficam na camada `components`.
 */
export function Button({
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={state =>
        buttonVariants({
          variant,
          size,
          className:
            typeof className === 'function' ? className(state) : className,
        })
      }
    >
      {children}
    </BaseButton>
  );
}
