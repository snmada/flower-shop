import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui/button';

interface LinkButtonProps extends ButtonProps {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export function LinkButton({
  href,
  disabled,
  children,
  ...props
}: LinkButtonProps) {
  if (disabled) {
    return (
      <Button disabled {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
