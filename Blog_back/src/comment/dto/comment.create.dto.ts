import { IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  comment: string;
}
