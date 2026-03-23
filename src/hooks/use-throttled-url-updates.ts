import { updateUrlParams } from '#src/config/spring-url-params.js';
import { URL_UPDATE_THROTTLE_MS } from '#src/constants/throttle.js';
import { throttle } from 'es-toolkit';
import { useEffect, useMemo } from 'react';

export function useThrottledUrlUpdates() {
  const throttledUpdateStiffness = useMemo(
    () =>
      throttle((value: number) => updateUrlParams({ stiffness: value }), URL_UPDATE_THROTTLE_MS, {
        edges: ['leading', 'trailing'],
      }),
    []
  );

  const throttledUpdateDamping = useMemo(
    () =>
      throttle((value: number) => updateUrlParams({ damping: value }), URL_UPDATE_THROTTLE_MS, {
        edges: ['leading', 'trailing'],
      }),
    []
  );

  const throttledUpdateMass = useMemo(
    () =>
      throttle((value: number) => updateUrlParams({ mass: value }), URL_UPDATE_THROTTLE_MS, {
        edges: ['leading', 'trailing'],
      }),
    []
  );

  useEffect(() => {
    return () => {
      throttledUpdateStiffness.cancel();
      throttledUpdateDamping.cancel();
      throttledUpdateMass.cancel();
    };
  }, [throttledUpdateStiffness, throttledUpdateDamping, throttledUpdateMass]);

  return { throttledUpdateStiffness, throttledUpdateDamping, throttledUpdateMass };
}
