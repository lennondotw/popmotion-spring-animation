import { cn } from '#src/utils/cn.js';
import type { FC } from 'react';

/**
 * Component for displaying help text and tips about spring animation
 */
export const HelpText: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex w-full flex-col gap-2 text-xs text-gray-400', className)}>
      <p>Try adjusting parameters or clicking the area to set target values, observe animation effects.</p>
      <p>
        Higher stiffness makes animation faster, higher damping reduces oscillation, higher mass makes animation slower.
      </p>
      <p>Press number keys &apos;1-9&apos;, &apos;0&apos; and &apos;-&apos; to quickly select preset values.</p>
    </div>
  );
};
