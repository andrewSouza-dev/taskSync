/*
  Warnings:

  - The primary key for the `UserTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `role` column on the `UserTask` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,taskId]` on the table `UserTask` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_pkey",
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'MEMBER';

-- CreateIndex
CREATE UNIQUE INDEX "UserTask_userId_taskId_key" ON "UserTask"("userId", "taskId");
