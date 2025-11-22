import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient({
  adapter: new PrismaPg({
    url: process.env.DATABASE_URL,
  }),
});
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
