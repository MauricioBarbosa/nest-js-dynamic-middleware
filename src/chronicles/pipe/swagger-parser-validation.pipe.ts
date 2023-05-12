import * as SwaggerParser from '@apidevtools/swagger-parser';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SwaggerParserValidationPipe implements PipeTransform {
  async transform(value: any) {
    try {
      const api = await SwaggerParser.validate(value);
      return api;
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: error.message,
      });
    }
  }
}
