import { Divider } from '@/components/divider';
import { SPRING_PARAMS } from '@/constants/spring-params.ts';
import { cn } from '@/utils/cn';
import * as Label from '@radix-ui/react-label';
import * as Slider from '@radix-ui/react-slider';
import { FC } from 'react';
import { DerivedSpringValues } from './derived-spring-values';

/**
 * Props for SpringParameterControl component
 */
export interface SpringParameterControlProps {
  stiffness: number;
  damping: number;
  mass: number;
  className?: string;
  onStiffnessChange: (values: number[]) => void;
  onDampingChange: (values: number[]) => void;
  onMassChange: (values: number[]) => void;
  onOmegaChange?: (omega: number) => void;
  onZetaChange?: (zeta: number) => void;
  onReset?: () => void;
}

/**
 * Component for controlling spring animation parameters
 */
export const SpringParameterControl: FC<SpringParameterControlProps> = ({
  stiffness,
  damping,
  mass,
  onStiffnessChange,
  onDampingChange,
  onMassChange,
  onOmegaChange,
  onZetaChange,
  onReset,
  className,
}) => {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <div className="flex items-end justify-between">
        <h4 className="text-sm font-medium text-gray-400">Spring Parameters</h4>
        {onReset && (
          <button
            onClick={onReset}
            className="
              cursor-pointer rounded-sm bg-gray-700 px-2 py-1 text-xs text-white transition-colors
              hover:bg-gray-600
            "
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>
            k (stiffness): <span className="font-mono">{stiffness.toFixed(2)}</span>
          </Label.Root>
          <span className="text-xs text-gray-500">{SPRING_PARAMS.STIFFNESS.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[stiffness]}
          onValueChange={onStiffnessChange}
          max={SPRING_PARAMS.STIFFNESS.MAX}
          min={SPRING_PARAMS.STIFFNESS.MIN}
          step={SPRING_PARAMS.STIFFNESS.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb
            className="
              block size-4 rounded-full border border-blue-500 bg-gray-800 shadow-sm outline-none
            "
            aria-label="Stiffness"
          />
        </Slider.Root>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>
            c (damping): <span className="font-mono">{damping.toFixed(2)}</span>
          </Label.Root>
          <span className="text-xs text-gray-500">{SPRING_PARAMS.DAMPING.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[damping]}
          onValueChange={onDampingChange}
          max={SPRING_PARAMS.DAMPING.MAX}
          min={SPRING_PARAMS.DAMPING.MIN}
          step={SPRING_PARAMS.DAMPING.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb
            className="
              block size-4 rounded-full border border-blue-500 bg-gray-800 shadow-sm outline-none
            "
            aria-label="Damping"
          />
        </Slider.Root>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Label.Root>
            m (mass): <span className="font-mono">{mass.toFixed(1)}</span>
          </Label.Root>
          <span className="text-xs text-gray-500">{SPRING_PARAMS.MASS.DESCRIPTION}</span>
        </div>
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center select-none"
          value={[mass]}
          onValueChange={onMassChange}
          max={SPRING_PARAMS.MASS.MAX}
          min={SPRING_PARAMS.MASS.MIN}
          step={SPRING_PARAMS.MASS.STEP}
        >
          <Slider.Track className="relative h-1 w-full grow rounded-full bg-gray-700">
            <Slider.Range className="absolute h-full rounded-full bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb
            className="
              block size-4 rounded-full border border-blue-500 bg-gray-800 shadow-sm outline-none
            "
            aria-label="Mass"
          />
        </Slider.Root>
      </div>

      <Divider />

      {/* Perceptual parameters (editable) */}
      <DerivedSpringValues
        stiffness={stiffness}
        damping={damping}
        mass={mass}
        onOmegaChange={onOmegaChange}
        onZetaChange={onZetaChange}
      />
    </div>
  );
};
