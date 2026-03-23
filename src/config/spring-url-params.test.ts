import { describe, expect, it } from 'vitest';
import { getSpringParamsFromUrl, getSpringParamsFromUrlWithDefaultValues } from './spring-url-params.js';

describe('spring-url-params', () => {
  describe('getSpringParamsFromUrl', () => {
    it('parses valid parameters from URL', () => {
      const url = new URL('https://example.com?stiffness=200&damping=30&mass=2');
      const result = getSpringParamsFromUrl(url);

      expect(result).toEqual({ stiffness: 200, damping: 30, mass: 2 });
    });

    it('returns empty object for invalid parameters', () => {
      const url = new URL('https://example.com?stiffness=invalid&damping=-1');
      const result = getSpringParamsFromUrl(url);

      expect(result).toEqual({});
    });

    it('returns partial result for mixed valid/invalid', () => {
      const url = new URL('https://example.com?stiffness=300&damping=invalid');
      const result = getSpringParamsFromUrl(url);

      expect(result).toEqual({ stiffness: 300 });
    });
  });

  describe('getSpringParamsFromUrlWithDefaultValues', () => {
    it('merges URL params with defaults', () => {
      const url = new URL('https://example.com?stiffness=200');
      const result = getSpringParamsFromUrlWithDefaultValues(url);

      expect(result.stiffness).toBe(200);
      expect(result.damping).toBe(40); // default
      expect(result.mass).toBe(1); // default
    });

    it('returns all defaults when no params', () => {
      const url = new URL('https://example.com');
      const result = getSpringParamsFromUrlWithDefaultValues(url);

      expect(result).toEqual({ stiffness: 400, damping: 40, mass: 1 });
    });
  });
});
