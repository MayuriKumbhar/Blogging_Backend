import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfiguration } from './config/typeorm.config';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    BlogModule,
    UserModule,

    // adding dependency for TypeORM
    TypeOrmModule.forRoot(TypeORMConfiguration),

    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
