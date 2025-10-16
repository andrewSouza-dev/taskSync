-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTask" (
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "role" TEXT,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("userId","taskId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
