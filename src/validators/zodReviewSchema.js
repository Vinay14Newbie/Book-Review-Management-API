import { z } from 'zod';

export const zodReviewSchema = z.object({
  reviewer: z.string().min(1),
  rating: z.number().min(1).max(5)
});
