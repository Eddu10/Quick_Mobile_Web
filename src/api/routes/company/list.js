'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/company/list');

const resultModel = Joi.array()
    .items(
        Joi.object({
        id: Joi.number(),
        id_number: Joi.string(),
        company_name: Joi.string(),
        trade_name: Joi.string(),
        address: Joi.string(),
        fiscal_position: Joi.string(),
        account_obligated: Joi.string(),
        logo: Joi.string(),
        phone: Joi.string(),
        email: Joi.string(),
        description: Joi.string(),
        max_ammount: Joi.number(),
        enviroment: Joi.string(),
        attempts_number: Joi.number(),
        deletedAt: Joi.string(),
        flagActive: Joi.boolean(),
        createdAt: Joi.string(),
        updatedAt: Joi.string(),
        }).label('Company'),
    )
    .label('Companies');
    
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
        description: 'List companies ',
        notes: 'Returns a list of companies filtered by params',
        plugins: {
            'hapi-swagger': {
                responses: resultHTTPStatus,
            },
        },
        tags: ['api'],
        validate: {
            failAction,
            query: Joi.object({
                id_number: Joi.number(),
                company_name: Joi.string(),
				trade_name: Joi.string(),
				address: Joi.string(),
                fiscal_position: Joi.string(),
                account_obligated: Joi.string(),
				logo: Joi.string(),
				phone: Joi.string(),
				email: Joi.string(),
				description: Joi.string(),
            }),
        },
    },
};

module.exports = route;
