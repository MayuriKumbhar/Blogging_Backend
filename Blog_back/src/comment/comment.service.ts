import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async getCommentByUsername(username: string) {
    const comment = await this.commentRepository.findOne(username);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async getCommentById(id: string) {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async createComment(createCommentDto: CreateCommentDTO, user: UserEntity) {
    return this.commentRepository.createComment(createCommentDto, user);
  }

  async deleteComment(id: string) {
    const comment = await this.commentRepository.delete(id);
    if (comment.affected == 0) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async updateComment(username: string, createCommentDto: CreateCommentDTO) {
    const comment = await this.getCommentByUsername(username);
    comment.comment = createCommentDto.comment;
    await comment.save();
    return comment;
  }

  async getComment() {
    
  }
}
