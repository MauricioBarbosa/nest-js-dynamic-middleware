import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ChronicleController } from './chronicles.controller';
import { ChroniclesService } from './chronicles.service';
import { OpenApiExceptionFilter } from './filter/openapi-exception.filter';
import { MiddlewareServiceSingleton } from './middleware-service/middleware.service';
import * as OpenApiValidator from 'express-openapi-validator';
import openapiNatura from './openapi/openapi-natura';

@Module({
  controllers: [ChronicleController],
  providers: [
    ChroniclesService,
    {
      provide: APP_FILTER,
      useClass: OpenApiExceptionFilter,
    },
  ],
})
export class ChroniclesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(
    //     ...OpenApiValidator.middleware({
    //       apiSpec: openapiNatura.spec,
    //       validateRequests: true,
    //     }),
    //   )
    //   .forRoutes({
    //     path: 'chronicle/:slug/contract',
    //     method: RequestMethod.POST,
    //   });
    MiddlewareServiceSingleton.instantiate().getMiddleware('tim');
    consumer.apply(RouterMiddleware).forRoutes({
      path: 'chronicle/:slug/contract',
      method: RequestMethod.POST,
    });
  }
}

function getMiddlewares(req, res, next) {
  const slug = req.params.slug;

  console.log(slug);

  const middlewares =
    MiddlewareServiceSingleton.getInstance().getMiddleware(slug);

  console.log(middlewares);

  if (!middlewares) {
    return next();
  } else {
    return middlewares;
  }
}

function RouterMiddleware(req, res, next) {
  const middlewares = getMiddlewares(req, res, next);
  if (middlewares && middlewares.length > 0) {
    const nextMiddleware = (i: number) => {
      if (i < middlewares.length) {
        const middleware = middlewares[i];
        middleware(req, res, (err) => {
          if (err) {
            return next(err);
          }
          nextMiddleware(i + 1);
        });
      } else {
        next();
      }
    };
    nextMiddleware(0);
  } else {
    next();
  }
}
