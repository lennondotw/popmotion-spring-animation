/**
 * Spring physics conversion utilities
 * Bidirectional conversion between physical and perceptual parameters
 */

/**
 * Convert perceptual parameters to physical (perceptual → physical)
 * @param omega - Natural frequency (ω)
 * @param zeta - Damping ratio (ζ)
 * @param mass - Object mass
 */
export function perceptualToPhysical(
  omega: number,
  zeta: number,
  mass: number
): { stiffness: number; damping: number } {
  // stiffness = ω² × m
  const stiffness = omega * omega * mass;
  // damping = ζ × 2 × ω × m
  const damping = zeta * 2 * omega * mass;
  return { stiffness, damping };
}

/**
 * Convert physical parameters to perceptual (physical → perceptual)
 * @param stiffness - Spring stiffness (k)
 * @param damping - Damping coefficient (c)
 * @param mass - Object mass (m)
 */
export function physicalToPerceptual(
  stiffness: number,
  damping: number,
  mass: number
): { omega: number; zeta: number } {
  // ω = √(k / m)
  const omega = Math.sqrt(stiffness / mass);
  // ζ = c / (2 × √(k × m)) = c / (2 × ω × m)
  const zeta = damping / (2 * omega * mass);
  return { omega, zeta };
}

/**
 * Calculate critical damping value
 * @param stiffness - Spring stiffness (k)
 * @param mass - Object mass (m)
 */
export function calculateCriticalDamping(stiffness: number, mass: number): number {
  return 2 * Math.sqrt(stiffness * mass);
}
