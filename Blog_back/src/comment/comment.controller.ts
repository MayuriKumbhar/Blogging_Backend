import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { CommentService } from './comment.service';
import { UserEntity } from 'src/user/user.entity';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { CommentEntity } from './blog.comment.entity';
import { GetComment } from './get.comment.decorator';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UsePipes()
  createComment(
    @GetUser() user: UserEntity,
    @Body() createCommentDto: CreateCommentDTO,
  ) {
    return this.commentService.createComment(createCommentDto, user);
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  getComment(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }

  @Patch(':id')
  updateComment(
    @Param(':id') id: string,
    @Body() createCommentDto: CreateCommentDTO,
  ) {
    return this.commentService.updateComment(id, createCommentDto);
  }
}
