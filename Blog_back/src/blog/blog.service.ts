import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogRepository } from './blog.repository';
import { SearchBlogDTO } from './dto/search.blog.dto';
import { UserEntity } from './../user/user.entity';
import { CreateBlogDTO } from './dto/create.blog.dto';
import { BlogTags } from './blog.enum';
import { UpdateBlogDTO } from './dto/update.blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
  ) {}

  // return blogs

  async getBlogs(searchBlogDto: SearchBlogDTO, user: UserEntity) {
    return this.blogRepository.getBlogs(searchBlogDto, user);
  }

  // create a new blog
  async createBlog(createBlogDto: CreateBlogDTO, user: UserEntity) {
    return this.blogRepository.createBlog(createBlogDto, user);
  }

  // getting a blog by id
  async getBlogById(id: string) {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    return blog;
  }

  // update blog tag
  async updateBlogTag(id: string, tag: BlogTags) {
    const blog = await this.getBlogById(id);
    blog.tag = tag;
    await blog.save();
    return blog;
  }

  // delete blog
  async deleteBlog(id: string) {
    const result = await this.blogRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('blog not found');
    }
    return result;
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDTO){
    const blog = await this.getBlogById(id);
    blog.title = updateBlogDto.title;
    blog.content = updateBlogDto.content;
    blog.tag = updateBlogDto.tag;
    await blog.save();
    return blog;
  }
}
