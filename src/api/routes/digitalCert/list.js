'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/digitalCert/list');

const resultModel = Joi.array()
    .items(
        Joi.object({
        id: Joi.number(),
        password: Joi.string(),
        digital_cert: Joi.string(),
        company_id: Joi.string(),
        deletedAt: Joi.string(),
        flagActive: Joi.boolean(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),
        }).label('Digital Certificate'),
    )
    .label('Digitals Certificates');
    
const unauthorizedModel = Joi.object({
    statusCode: Joi.number(),
    error: Joi.string(),
    message: Joi.string(),
    attributes: Joi.object({
        error: Joi.string(),
    }).optional(),
}).label('Unauthorized');

const errorModel = Joi.object({
    statusCode: Joi.number(),
    error: Joi.string(),
    message: Joi.string(),
}).label('Error');

const resultHTTPStatus = {
    200: {
        description: 'Success',
        schema: resultModel,
    },
    400: {
        description: 'Bad Request',
        schema: errorModel,
    },
    401: {
        description: 'Unauthorized',
        schema: unauthorizedModel,
    },
    500: {
        description: 'Internal Server Error',
        schema: errorModel,
    },
};

const route = {
    handler,
    method: 'GET',
    path: '/',
    options: {
        description: 'List Digital Certificate ',
        notes: 'Returns a list of Digital Certificate filtered by params',
        plugins: {
            'hapi-swagger': {
                responses: resultHTTPStatus,
            },
        },
        tags: ['api'],
        validate: {
            failAction,
            query: Joi.object({
                password: Joi.string(),
                digital_cert: Joi.string(),
				company_id: Joi.string(),
            }),
        },
    },
};

module.exports = route;
