'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/establishment/list');

const resultModel = Joi.array()
	.items(
		Joi.object({
			id: Joi.number(),
			number: Joi.string(),
			address: Joi.string(),
			company_id: Joi.number(),
			company_name: Joi.string(),
            state: Joi.string(),
		}).label('Establishment'),
	)
	.label('Establishment');

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
		description: 'List establishments',
		notes: 'Returns a list of establishments filtered by params',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		validate: {
			failAction,
			query: Joi.object({
				number: Joi.string(),
				address: Joi.string(),
                company_name: Joi.string().allow(null),
                state: Joi.string(),
			}),
		},
	},
};

module.exports = route;
