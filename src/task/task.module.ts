import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [DatabaseModule,UserModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule { }
