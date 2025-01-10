import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const origin = (process.env.ORIGIN_URLS || '').split(',');

export const corsOptions: CorsOptions = {
  origin,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
