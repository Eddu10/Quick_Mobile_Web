'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/electronicDocument/list');

const resultModel = Joi.array()
	.items(
		Joi.object({
			id: Joi.number(),
			company_id: Joi.number(),
            doc_number: Joi.string(),
            access_key: Joi.string(),
            auth_number: Joi.string(),
            xml_content: Joi.string(),
            state: Joi.string(),
            auth_date: Joi.date(),
            last_attempt_date: Joi.date(),
            attempt_number: Joi.number(),
            issue_date: Joi.date(),
            xml_auth: Joi.string(),
		}).label('Electronic Document'),
	)
	.label('Electronic Documents');

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
		description: 'List electronic documents',
		notes: 'Returns a list of electronic documents filtered by params',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		validate: {
			failAction,
			query: Joi.object({
				company_id: Joi.number(),
				doc_number: Joi.string(),
				access_key: Joi.string(),
				auth_number: Joi.string(),
				xml_content: Joi.string().allow(null),
				state: Joi.string(),
				auth_date: Joi.date(),
				last_attempt_date: Joi.date(),
				attempt_number: Joi.number(),
				issue_date: Joi.date(),
				xml_auth: Joi.string().allow(null),
			}),
		},
	},
};

module.exports = route;
