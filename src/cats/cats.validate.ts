import { z } from 'zod';

const cats = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .strict();

type ICats = z.infer<typeof cats>;

interface IReturnCreate {
  data?: ICats;
  error?: any;
}

export class CatsValidation {
  create(data: any): IReturnCreate {
    try {
      return { data: cats.parse(data) };
    } catch (error) {
      return { error: error.message };
    }
  }
}
