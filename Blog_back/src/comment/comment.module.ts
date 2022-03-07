import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { UserModule } from './../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
