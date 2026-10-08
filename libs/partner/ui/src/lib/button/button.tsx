import type { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  const variantClass = variant === 'secondary' ? styles.secondary : undefined;
  return (
    <button
      className={[styles.button, variantClass, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
}

export default Button;
