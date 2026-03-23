import { useCallback, useMemo, useRef } from 'react';

const MAX_VELOCITY_DELTA = 30; // ms - same as Motion's threshold

export interface VelocityTracker {
  track: (value: number) => void;
  getVelocity: () => number;
  reset: () => void;
}

/**
 * Hook to track velocity of a changing value
 * Uses two-frame difference with stale protection (similar to Motion's approach)
 */
export function useVelocityTracker(): VelocityTracker {
  const prevValueRef = useRef<number | undefined>(undefined);
  const prevTimeRef = useRef<number | undefined>(undefined);
  const velocityRef = useRef(0);

  const track = useCallback((value: number) => {
    const now = performance.now();

    if (prevValueRef.current !== undefined && prevTimeRef.current !== undefined) {
      const deltaTime = now - prevTimeRef.current;

      if (deltaTime > 0 && deltaTime < MAX_VELOCITY_DELTA) {
        // Valid delta - calculate velocity (units per second)
        velocityRef.current = ((value - prevValueRef.current) / deltaTime) * 1000;
      } else if (deltaTime >= MAX_VELOCITY_DELTA) {
        // Stale - assume velocity is 0
        velocityRef.current = 0;
      }
    }

    prevValueRef.current = value;
    prevTimeRef.current = now;
  }, []);

  const getVelocity = useCallback(() => {
    const now = performance.now();

    // If too much time has passed since last update, return 0
    if (prevTimeRef.current !== undefined && now - prevTimeRef.current > MAX_VELOCITY_DELTA) {
      return 0;
    }

    return velocityRef.current;
  }, []);

  const reset = useCallback(() => {
    prevValueRef.current = undefined;
    prevTimeRef.current = undefined;
    velocityRef.current = 0;
  }, []);

  return useMemo(() => ({ track, getVelocity, reset }), [track, getVelocity, reset]);
}
