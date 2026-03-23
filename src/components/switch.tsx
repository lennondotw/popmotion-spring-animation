import { cn } from '#src/utils/cn.js';
import type { FC } from 'react';

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export const Switch: FC<SwitchProps> = ({ checked, onCheckedChange, label, description, className }) => {
  return (
    <label className={cn('flex cursor-pointer items-center justify-between gap-3', className)}>
      <div className="flex flex-col">
        {label && <span className="text-sm font-medium">{label}</span>}
        {description && <span className="text-xs text-gray-500">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors',
          checked ? 'bg-blue-500' : 'bg-gray-600'
        )}
      >
        <span
          className={cn(
            'pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform',
            checked ? 'translate-x-[18px]' : 'translate-x-0.5'
          )}
        />
      </button>
    </label>
  );
};
