'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/establishment/create');
const pre = require('../../pre/establishment');

const resultModel = Joi.object({
	number: Joi.string(),
	address: Joi.string(),
	company_id: Joi.number(),
	company_name: Joi.string(),
    state: Joi.string(),
	deletedAt: Joi.string(),
	flagActive: Joi.boolean(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
	id: Joi.number(),
}).label('Created Establishment');

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
		description: 'Create establishment',
		notes: 'Create an establishment and return the created object',
		tags: ['api'],
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
				payloadType: 'form',
			},
		},
		pre: [
			{
				method: pre.validateByNumber,
			},
			{
				method: pre.validationByCompanyId,
			},
		],
		validate: {
			failAction,
			payload: Joi.object({
				number: Joi.string().required().max(10),
				address: Joi.string().max(100),
				company_id: Joi.number().required(),
				company_name: Joi.string().max(50),
				state: Joi.string().max(10),
			}),
		},
	},
};

module.exports = route; 
