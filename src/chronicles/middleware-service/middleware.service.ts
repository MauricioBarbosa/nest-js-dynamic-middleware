import timOpenApi from '../openapi/openapi-tim';
import naturaOpenApi from '../openapi/openapi-natura';
import { OpenApiRequestHandler } from 'express-openapi-validator/dist/framework/types';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

class MiddlewareService {
  private middlewares: Array<{
    key: string;
    requestHandler: OpenApiRequestHandler[];
  }>;

  constructor() {
    this.loadMiddlewares();
  }

  private loadMiddlewares() {
    this.middlewares = [];

    this.middlewares.push({
      key: timOpenApi.key,
      requestHandler: OpenApiValidator.middleware({
        apiSpec: timOpenApi.spec,
        validateRequests: true,
        validateResponses: true,
      }),
    });

    this.middlewares.push({
      key: naturaOpenApi.key,
      requestHandler: OpenApiValidator.middleware({
        apiSpec: naturaOpenApi.spec,
        validateRequests: true,
        validateResponses: true,
      }),
    });
  }

  public getMiddleware(key: string) {
    const middleware = this.middlewares.find((middleware) => {
      return middleware.key === key;
    });

    if (middleware) {
      return middleware.requestHandler;
    }

    return null;
  }

  public addMiddleware(key: string, spec: OpenAPIV3.Document) {
    this.middlewares.push({
      key: key,
      requestHandler: OpenApiValidator.middleware({
        apiSpec: spec,
        validateRequests: true,
        validateResponses: true,
      }),
    });
  }
}

export class MiddlewareServiceSingleton {
  private static instace: MiddlewareService = null;

  public static instantiate() {
    if (this.instace === null) {
      this.instace = new MiddlewareService();
    }
    return this.instace;
  }

  public static getInstance() {
    return this.instace;
  }
}
