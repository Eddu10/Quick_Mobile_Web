'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/user/list');

const resultModel = Joi.array()
	.items(
		Joi.object({
			id: Joi.number(),
			username: Joi.string(),
			email: Joi.string(),
			group: Joi.string(),
			description: Joi.string(),
		}).label('User'),
	)
	.label('Users');

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
		description: 'List users',
		notes: 'Returns a list of users filtered by params',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		validate: {
			failAction,
			query: Joi.object({
				username: Joi.string()
					.allow(null)
					.description('This is a description'),
				group: Joi.string().allow(null),
			}),
		},
	},
};

module.exports = route;
