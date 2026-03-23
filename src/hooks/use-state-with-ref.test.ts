import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStateWithRef } from './use-state-with-ref.js';

describe('useStateWithRef', () => {
  it('initializes with the given value', () => {
    const { result } = renderHook(() => useStateWithRef(42));

    expect(result.current[0]).toBe(42);
    expect(result.current[2].current).toBe(42);
  });

  it('updates both state and ref when setValue is called', () => {
    const { result } = renderHook(() => useStateWithRef(0));

    act(() => {
      result.current[1](10);
    });

    expect(result.current[0]).toBe(10);
    expect(result.current[2].current).toBe(10);
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useStateWithRef(5));

    act(() => {
      result.current[1]((prev: number) => prev + 3);
    });

    expect(result.current[0]).toBe(8);
    expect(result.current[2].current).toBe(8);
  });

  it('ref always has latest value synchronously', () => {
    const { result } = renderHook(() => useStateWithRef(0));

    act(() => {
      result.current[1](1);
      expect(result.current[2].current).toBe(1);
      result.current[1](2);
      expect(result.current[2].current).toBe(2);
    });
  });
});
