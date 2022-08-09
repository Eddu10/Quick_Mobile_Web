'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/company/patch');
const pre = require('../../pre/company');

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
		description: 'Edit company',
		notes: 'Edits a company and returns ok if success',
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
		],
		validate: {
			failAction,
			payload: Joi.object({
				id_number: Joi.string().required().max(13),
				company_name: Joi.string().required().max(100),
				trade_name: Joi.string().required().max(100),
                address: Joi.string().max(100),
				fiscal_position: Joi.string().max(100),
				account_obligated: Joi.string().max(100),
                logo: Joi.string(),
                phone: Joi.string().max(15),
                email: Joi.string().max(50).email({ tlds: { allow: false } }),
				description: Joi.string(),
				max_ammount: Joi.number(),
				enviroment: Joi.string(),
				attempts_number: Joi.number(),
			}),
		},
	},
};

module.exports = route;
