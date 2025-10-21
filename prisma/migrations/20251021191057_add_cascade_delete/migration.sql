-- DropForeignKey
ALTER TABLE "public"."UserTask" DROP CONSTRAINT "UserTask_taskId_fkey";

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
