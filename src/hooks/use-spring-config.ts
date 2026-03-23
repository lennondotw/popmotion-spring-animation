import { defaultSpringParams } from '#src/config/spring-schema.js';
import { getSpringParamsFromUrlWithDefaultValues } from '#src/config/spring-url-params.js';
import { useMemo, useState } from 'react';

export const useSpringConfig = () => {
  const initialConfig = useMemo(() => {
    try {
      return getSpringParamsFromUrlWithDefaultValues(new URL(window.location.href));
    } catch {
      return defaultSpringParams;
    }
  }, []);

  const [stiffness, setStiffness] = useState(initialConfig.stiffness);
  const [damping, setDamping] = useState(initialConfig.damping);
  const [mass, setMass] = useState(initialConfig.mass);

  return { stiffness, damping, mass, setStiffness, setDamping, setMass };
};
