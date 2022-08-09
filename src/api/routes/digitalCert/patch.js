'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/digitalCert/patch');
const pre = require('../../pre/digitalCert');

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
		description: 'Edit Digital Certificate',
		notes: 'Edits a Digital Certificate and returns ok if success',
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
				method: pre.validationByCompanyId,
			},
		],
		validate: {
			failAction,
			payload: Joi.object({
				password: Joi.string().max(24),
				digital_cert: Joi.string(),
				company_id:Joi.number(),
			}),
		},
	},
};

module.exports = route;
