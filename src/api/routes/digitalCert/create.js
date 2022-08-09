'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/digitalCert/create');
const pre = require('../../pre/digitalCert');

const resultModel = Joi.object({
	password: Joi.string(),
	digital_cert: Joi.string(),
	company_id: Joi.number(),
	deletedAt: Joi.string(),
	flagActive: Joi.boolean(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
	id: Joi.number(),
}).label('Created Digital Certificate');

const unauthorizedModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	attributes: Joi.object({
		error: Joi.string(),
	}).optional(),
}).label('Unauthorized');

const badRequestModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	validation: Joi.object({
		source: Joi.string(),
		keys: Joi.array(),
	}).optional(),
}).label('Validation Bad Request');

const errorModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
}).label('Error');

const resultHTTPStatus = {
	201: {
		description: 'Success',
		schema: resultModel,
	},
	400: {
		description: 'Bad Request',
		schema: badRequestModel,
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
	method: 'POST',
	path: '/',
	options: {
		description: 'Create digital certificate',
		notes: 'Create a digital certificate and return the created object',
		tags: ['api'],
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
				payloadType: 'form',
			},
		},
		pre: [
			
			{
				method: pre.validationByCompanyId,
			},
		],
		validate: {
			failAction,
			payload: Joi.object({
				company_id:Joi.number(),
				password: Joi.string().required().max(24),
				digital_cert: Joi.string(),
			}),
		},
	},
};

module.exports = route;
