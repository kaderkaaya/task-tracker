import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg'; //bu prisma6 ile adapter mantigi geldigi icin
//kullaniyoruz. @prisma/client mantigi kalkmis oldu.npx generate etmemiz gerekli.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = new PrismaClient({
  adapter: new PrismaPg({
    url: env('DATABASE_URL'),
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
