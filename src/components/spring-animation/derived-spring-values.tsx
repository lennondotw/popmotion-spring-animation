import { PERCEPTUAL_PARAMS } from '#src/constants/spring-params.js';
import { cn } from '#src/utils/cn.js';
import type { DampingType } from '#src/utils/spring-physics.js';
import { calculateCriticalDamping, getDampingType, physicalToPerceptual } from '#src/utils/spring-physics.js';
import * as Label from '@radix-ui/react-label';
import * as Slider from '@radix-ui/react-slider';
import type { FC } from 'react';
import { useMemo } from 'react';

interface DerivedValues {
  omega: number;
  zeta: number;
  dampingType: DampingType;
  criticalDamping: number;
}

function calculateDerivedValues(stiffness: number, damping: number, mass: number): DerivedValues {
  const { omega, zeta } = physicalToPerceptual(stiffness, damping, mass);
  const criticalDamping = calculateCriticalDamping(stiffness, mass);
  const dampingType = getDampingType(zeta);

  return { omega, zeta, dampingType, criticalDamping };
}

/**
 * Damping type display configuration
 */
const DAMPING_TYPE_LABEL: Record<DampingType, string> = {
  underdamped: 'Underdamped',
  critical: 'Critical',
  overdamped: 'Overdamped',
};

/**
 * Props for DerivedSpringValues component
 */
export interface DerivedSpringValuesProps {
  stiffness: number;
  damping: number;
  mass: number;
  className?: string;
  onOmegaChange?: (omega: number) => void;
  onZetaChange?: (zeta: number) => void;
}

/**
 * Component displaying and editing derived spring physics values
 */
export const DerivedSpringValues: FC<DerivedSpringValuesProps> = ({
  stiffness,
  damping,
  mass,
  className,
  onOmegaChange,
  onZetaChange,
}) => {
  const derived = useMemo(() => calculateDerivedValues(stiffness, damping, mass), [stiffness, damping, mass]);

  const dampingTypeLabel = DAMPING_TYPE_LABEL[derived.dampingType];

  const handleOmegaChange = (values: number[]) => {
    if (values[0] !== undefined && onOmegaChange) {
      onOmegaChange(values[0]);
    }
  };

  const handleZetaChange = (values: number[]) => {
    if (values[0] !== undefined && onZetaChange) {
      onZetaChange(values[0]);
    }
  };

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <h4 className="text-sm font-medium text-gray-400">Perceptual Parameters</h4>

      {/* Omega (ω) - Natural Frequency */}
      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>
            ω (frequency): <span className="font-mono">{derived.omega.toFixed(2)}</span> rad/s
          </Label.Root>
          <span className="text-xs text-gray-500">{PERCEPTUAL_PARAMS.OMEGA.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[derived.omega]}
          onValueChange={handleOmegaChange}
          min={PERCEPTUAL_PARAMS.OMEGA.MIN}
          max={PERCEPTUAL_PARAMS.OMEGA.MAX}
          step={PERCEPTUAL_PARAMS.OMEGA.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-purple-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-4 rounded-full border border-purple-500 bg-gray-800 shadow-sm outline-none"
            aria-label="Natural frequency"
          />
        </Slider.Root>
      </div>

      {/* Zeta (ζ) - Damping Ratio */}
      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>
            ζ (damping ratio): <span className="font-mono">{derived.zeta.toFixed(3)}</span>
          </Label.Root>
          <span className="text-xs text-gray-500">{PERCEPTUAL_PARAMS.ZETA.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[derived.zeta]}
          onValueChange={handleZetaChange}
          min={PERCEPTUAL_PARAMS.ZETA.MIN}
          max={PERCEPTUAL_PARAMS.ZETA.MAX}
          step={PERCEPTUAL_PARAMS.ZETA.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-purple-500" />
          </Slider.Track>
          <Slider.Thumb
            className="block size-4 rounded-full border border-purple-500 bg-gray-800 shadow-sm outline-none"
            aria-label="Damping ratio"
          />
        </Slider.Root>
      </div>

      {/* Read-only status */}
      <div className="mt-1 grid grid-cols-2 gap-x-4 text-sm">
        <div className="flex flex-col">
          <div className="text-gray-500">Type</div>
          <div className="font-mono">{dampingTypeLabel}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500">Critical damping</div>
          <div className="font-mono text-gray-300">{derived.criticalDamping.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
