import { BlogTags } from '../blog.enum';

export class SearchBlogDTO {
  search: string;
  tag: BlogTags;
}
