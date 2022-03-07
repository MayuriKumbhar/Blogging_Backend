import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { UserModule } from './../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository]), UserModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
