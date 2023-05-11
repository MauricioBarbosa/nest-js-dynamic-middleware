import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

const timOpenApi: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Chronicles APIs',
    description:
      'Barramento de integração para portais de negociação e pagamentos.',
  },
  paths: {
    '/chronicle/tim/agreements': {
      post: {
        summary:
          'Cadastrar o acordo no cliente do portal especificado no parâmetro PORTAL para o cliente especificado no paramtro DOC',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/agreement',
              },
            },
          },
        },
        responses: {
          200: {
            description:
              'Uma mensagem evidênciando o sucesso do cadastro de acordo',
          },
          500: {
            description: 'Unexpected error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/chronicle/tim/contract': {
      post: {
        summary:
          'Cadastrar o acordo no cliente do portal especificado no parâmetro PORTAL para o cliente especificado no paramtro DOC',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/contract',
              },
            },
          },
        },
        responses: {
          200: {
            description:
              'Uma mensagem evidênciando o sucesso do cadastro de acordo',
          },
        },
      },
      get: {
        summary:
          'Recuperar todos os dados do cliente descrito no parâmetro DOC',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/contract',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'O cliente referenciado no parâmetros `doc`',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/contract',
                },
              },
            },
          },
          400: {
            description:
              'Foram passados parâmetros faltantes ou incorretos na requisição',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    {
                      $ref: '#/components/schemas/missingPortalError',
                    },
                    {
                      $ref: '#/components/schemas/incorrectPortal',
                    },
                  ],
                },
              },
            },
          },
          500: {
            description: 'Unexpected error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      agreement: {
        type: 'object',
        required: ['reference'],
        properties: {
          reference: {
            type: 'number',
          },
          name: {
            type: 'string',
          },
        },
      },
      contract: {
        type: 'object',
        required: ['reference', 'name', 'debt', 'timcode'],
        properties: {
          reference: {
            type: 'number',
          },
          name: {
            type: 'string',
          },
          debt: {
            type: 'number',
          },
          timcode: {
            type: 'number',
          },
        },
      },
      Error: {
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            description: 'A human readable error message',
            type: 'string',
          },
        },
      },
      missingPortalError: {
        type: 'object',
        properties: {
          message: {
            description: 'O parâmetro `portal` não foi informado.',
            type: 'string',
          },
        },
      },
      incorrectPortal: {
        type: 'object',
        properties: {
          message: {
            description: 'O parâmetro `portal` informado é inválido.',
            type: 'string',
          },
        },
      },
    },
  },
  security: [
    {
      ApiKey: [],
    },
  ],
};

export default {
  key: 'tim',
  spec: timOpenApi,
};
