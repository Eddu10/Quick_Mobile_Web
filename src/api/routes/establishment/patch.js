'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/establishment/patch');
const pre = require('../../pre/establishment');

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
	method: 'PATCH',
	path: '/{id}',
	options: {
		description: 'Edit establishment',
		notes: 'Edits an establishment and returns ok if success',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		pre: [
			{
				method: pre.validateById,
			},
			{
				method: pre.validateByNumber,
			},
		],
		validate: {
			failAction,
			payload: Joi.object({
				number: Joi.string().max(10).allow(null),
				address: Joi.string().max(100).allow(null),
				company_name: Joi.string().max(50).allow(null),
				state: Joi.string().max(10).allow(null),
			}),
			params: Joi.object({
				id: Joi.number().required(),
			}),
		},
	},
};

module.exports = route;
