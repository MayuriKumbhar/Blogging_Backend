import { EntityRepository, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { SearchBlogDTO } from './dto/search.blog.dto';
import { UserEntity } from './../user/user.entity';
import { CreateBlogDTO } from './dto/create.blog.dto';
import { BlogTags } from './blog.enum';
import { UpdateBlogDTO } from './dto/update.blog.dto';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  // getBlogs

  async getBlogs(searchBlogDto: SearchBlogDTO, user: UserEntity) {
    const { search, tag } = searchBlogDto;

    const query = this.createQueryBuilder('blog');

    if (tag) {
      query.andWhere('blog.tag = :tag', { tag: tag });
    }

    if (search) {
      query.andWhere(
        `(blog.title LIKE :search) OR (blog.content LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    // add user id
    query.andWhere(`blog.userId = :userId`, { userId: user.id });

    return await query.getMany();
  }

  async createBlog(createBlogDto: CreateBlogDTO, user: UserEntity) {
    const blog = new BlogEntity();
    blog.title = createBlogDto.title;
    blog.content = createBlogDto.content;
    blog.tag = createBlogDto.tag;

    blog.user = user;

    await blog.save();

    delete blog.user;

    return blog;
  }

}
