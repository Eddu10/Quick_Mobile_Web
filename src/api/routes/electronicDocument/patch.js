'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/electronicDocument/patch');
const pre = require('../../pre/electronicDocument');

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
		description: 'Edit electronic document',
		notes: 'Edits an electronic document and returns ok if success',
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
				xml_content: Joi.string(),
				state: Joi.string().max(10),
				auth_date: Joi.date(),
				last_attempt_date: Joi.date(),
				attempt_number: Joi.number(),
				issue_date: Joi.date(),
				xml_auth: Joi.string(),
			}),
			params: Joi.object({
				id: Joi.number().required(),
			}),
		},
	},
};

module.exports = route;
