-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'HIGH', 'MEDIUM');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isFavorite" BOOLEAN,
ADD COLUMN     "isPrivate" BOOLEAN,
ADD COLUMN     "priority" "Priority" DEFAULT 'LOW';
