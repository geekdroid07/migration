import * as dotenv from 'dotenv';
import { join } from 'path';
import { setEnvironment } from './infrastructure/environments';

dotenv.config({ path: join(__dirname, '..', setEnvironment()) });

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 8080;

export const logDirectory = process.env.LOG_DIR;
export const corsUrl = process.env.CORS_URL;