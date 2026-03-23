import { SPRING_PARAMS } from '@/constants/spring-params.ts';
import { z } from 'zod';

// Define parameter schema (no min/max constraints to allow URL values outside slider range)
export const springParamsSchema = z.object({
  stiffness: z.coerce
    .number()
    .positive()
    .default(SPRING_PARAMS.STIFFNESS.DEFAULT)
    .describe(SPRING_PARAMS.STIFFNESS.DESCRIPTION),
  damping: z.coerce
    .number()
    .positive()
    .default(SPRING_PARAMS.DAMPING.DEFAULT)
    .describe(SPRING_PARAMS.DAMPING.DESCRIPTION),
  mass: z.coerce.number().positive().default(SPRING_PARAMS.MASS.DEFAULT).describe(SPRING_PARAMS.MASS.DESCRIPTION),
});

export type SpringParams = z.infer<typeof springParamsSchema>;

// Default parameters
export const defaultSpringParams: SpringParams = {
  stiffness: SPRING_PARAMS.STIFFNESS.DEFAULT,
  damping: SPRING_PARAMS.DAMPING.DEFAULT,
  mass: SPRING_PARAMS.MASS.DEFAULT,
};
