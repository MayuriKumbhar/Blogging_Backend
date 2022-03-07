import { IsNotEmpty, MaxLength } from 'class-validator';
import { BlogTags } from '../blog.enum';

export class CreateBlogDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  tag: BlogTags;
}
