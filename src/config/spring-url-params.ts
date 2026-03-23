import { entriesWithType } from '#src/utils/typings.js';
import type { SpringParams } from './spring-schema.js';
import { defaultSpringParams, springParamsSchema } from './spring-schema.js';

export function resetUrlParams(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('stiffness');
  url.searchParams.delete('damping');
  url.searchParams.delete('mass');
  window.history.replaceState({}, '', url.toString());
}

// Update URL parameters
export function updateUrlParams(params: Partial<SpringParams>): void {
  const url = new URL(window.location.href);
  const currentUrlParams = getSpringParamsFromUrl(url);

  for (const [key, value] of entriesWithType(params)) {
    if (!value) continue;
    if (currentUrlParams[key] === value) continue;

    const formatNumber = (num: number): string => {
      const formatted = num.toFixed(2).replace(/\.?0+$/, '');
      return formatted.endsWith('.') ? formatted.slice(0, -1) : formatted;
    };

    url.searchParams.set(key, formatNumber(value));
  }

  // Update URL without refreshing the page
  window.history.replaceState({}, '', url.toString());
}

// Get parameters from URL without default values
export function getSpringParamsFromUrl(url: URL): Partial<SpringParams> {
  const params: Partial<SpringParams> = {};

  // Validate and update each parameter individually
  const stiffnessResult = springParamsSchema.shape.stiffness.safeParse(url.searchParams.get('stiffness'));
  if (stiffnessResult.success) {
    params.stiffness = stiffnessResult.data;
  }

  const dampingResult = springParamsSchema.shape.damping.safeParse(url.searchParams.get('damping'));
  if (dampingResult.success) {
    params.damping = dampingResult.data;
  }

  const massResult = springParamsSchema.shape.mass.safeParse(url.searchParams.get('mass'));
  if (massResult.success) {
    params.mass = massResult.data;
  }

  return params;
}

// Get parameters from URL with default values
export function getSpringParamsFromUrlWithDefaultValues(url: URL): SpringParams {
  const urlParams = getSpringParamsFromUrl(url);
  return { ...structuredClone(defaultSpringParams), ...urlParams };
}
