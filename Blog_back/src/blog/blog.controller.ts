import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { BlogService } from './blog.service';
import { UserEntity } from './../user/user.entity';
import { CreateBlogDTO } from './dto/create.blog.dto';
import { SearchBlogDTO } from './dto/search.blog.dto';
import { BlogTags } from './blog.enum';
import { UpdateBlogDTO } from './dto/update.blog.dto';

@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBlog(
    @GetUser() user: UserEntity,
    @Body() createBlogDto: CreateBlogDTO,
  ) {
    return this.blogService.createBlog(createBlogDto, user);
  }

  @Get()
  getBlogs(@GetUser() user: UserEntity, @Query() searchBlogDto: SearchBlogDTO) {
    return this.blogService.getBlogs(searchBlogDto, user);
  }

  @Patch('/:id/:tag')
  updateBlogTag(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Param('tag') tag: BlogTags,
  ) {
    return this.blogService.updateBlogTag(id, tag);
  }

  @Delete('/:id')
  deleteBlog(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }

  @Patch('/:id')
  updateBlog(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDTO,
  ) {
    return this.blogService.updateBlog(id, updateBlogDto);
  }

  @Get('/:id')
  getBlogById(@GetUser() user: UserEntity, @Param('id') id: string ) {
    return this.blogService.getBlogById(id);
  }
}
