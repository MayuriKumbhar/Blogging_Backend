import { createParamDecorator } from '@nestjs/common';

export const GetComment = createParamDecorator((data, obj) => {
  if (obj.args.length > 0) {
    const request = obj.args[0];
    return request.comment;
  }

  return null;
});
