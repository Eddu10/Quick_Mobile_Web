'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/establishment/detail');
const pre = require('../../pre/establishment');

const resultModel = Joi.object({
	id: Joi.number(),
    number: Joi.string(),
    address: Joi.string(),
    company_id: Joi.number(),
    company_name: Joi.string(),
    state: Joi.string(),
	flagActive: Joi.boolean(),
	deletedAt: Joi.string(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
}).label('Establishment Detail');

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
	path: '/{id}',
	options: {
		description: 'Detail establishment',
		notes: 'Returns the detail of a establishments',
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
			params: Joi.object({
				id: Joi.number().required(),
			}),
		},
	},
};

module.exports = route;
