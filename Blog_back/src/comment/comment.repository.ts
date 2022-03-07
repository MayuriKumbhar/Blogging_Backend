import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './blog.comment.entity';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { UserEntity } from 'src/user/user.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  // create comment
  async createComment(createCommentDto: CreateCommentDTO, user: UserEntity) {
    const comment = new CommentEntity();
    comment.comment = createCommentDto.comment;
    comment.user = user;
    await comment.save();
    delete comment.user;
    return comment;
  }
}
