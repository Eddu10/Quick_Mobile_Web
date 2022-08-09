'use strict';

const Joi = require('joi');
const handler = require('../../handlers/login/login');

const resultModel = Joi.object({
	token: Joi.string().description('Token for further requests'),
}).label('Token');

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
		schema: errorModel,
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
		auth: 'simple',
		description: 'Login',
		notes: 'Simple authentication with user and password, no token',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
	},
};

module.exports = route;
