import OpenAPISchemaValidator from 'openapi-schema-validator';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OpenApiSchemaValidationPipe implements PipeTransform {
  async transform(value: any) {
    console.log(value);
    const validator = new OpenAPISchemaValidator({
      version: 3,
    });

    const { errors } = validator.validate(value);
    console.log(errors);
    if (errors) {
      throw new BadRequestException({
        errors: errors,
      });
    }

    return value;
  }
}
