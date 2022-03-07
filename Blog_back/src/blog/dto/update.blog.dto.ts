import { BlogTags } from '../blog.enum';

export class UpdateBlogDTO {
  title: string;

  content: string;

  tag: BlogTags;
}
