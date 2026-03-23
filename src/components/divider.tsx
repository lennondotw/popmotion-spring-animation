import { cn } from '@/utils/cn';
import { FC } from 'react';

export interface DividerProps {
  className?: string;
}

export const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={cn('h-px w-full bg-gray-700', className)} />;
};
