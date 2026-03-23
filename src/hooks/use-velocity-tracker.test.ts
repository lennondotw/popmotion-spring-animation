import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useVelocityTracker } from './use-velocity-tracker.js';

describe('useVelocityTracker', () => {
  let mockTime = 0;

  beforeEach(() => {
    mockTime = 0;
    vi.spyOn(performance, 'now').mockImplementation(() => mockTime);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 0 velocity initially', () => {
    const { result } = renderHook(() => useVelocityTracker());

    expect(result.current.getVelocity()).toBe(0);
  });

  it('calculates velocity from consecutive tracks', () => {
    const { result } = renderHook(() => useVelocityTracker());

    mockTime = 0;
    result.current.track(0);

    mockTime = 10; // 10ms later
    result.current.track(100); // moved 100 units

    // velocity = (100 - 0) / 10ms * 1000 = 10000 units/second
    expect(result.current.getVelocity()).toBe(10000);
  });

  it('returns 0 when time delta exceeds threshold (stale)', () => {
    const { result } = renderHook(() => useVelocityTracker());

    mockTime = 0;
    result.current.track(0);

    mockTime = 50; // 50ms later (> 30ms threshold)

    expect(result.current.getVelocity()).toBe(0);
  });

  it('resets velocity to 0', () => {
    const { result } = renderHook(() => useVelocityTracker());

    mockTime = 0;
    result.current.track(0);
    mockTime = 10;
    result.current.track(100);

    result.current.reset();

    expect(result.current.getVelocity()).toBe(0);
  });
});
