import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: string) {
    console.log(value);
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException({
        message: error.message,
        stack: error.details,
        joi: error.isJoi,
      });
    }
    return value;
  }
}
