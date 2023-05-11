import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { ChroniclesService } from './chronicles.service';
import { MiddlewareServiceSingleton } from './middleware-service/middleware.service';

@Controller('chronicle')
export class ChronicleController {
  constructor(private chronicleService: ChroniclesService) {}

  @Get()
  test(): string {
    return 'mauricio';
  }

  @Post(':slug/contract')
  contract(@Param('slug') slug: string) {
    console.log(slug);

    return 'contract';
  }

  @Post(':slug/agreement')
  agreement(@Param('slug') slug: string) {
    console.log(slug);

    return 'agreement';
  }

  @Post(':slug/open-api')
  register(@Param('slug') slug: string, @Body() openApi: OpenAPIV3.Document) {
    MiddlewareServiceSingleton.getInstance().addMiddleware(slug, openApi);

    return 'openApi';
  }
}
