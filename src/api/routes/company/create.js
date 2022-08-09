'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/company/create');
const pre = require('../../pre/company');

const resultModel = Joi.object({
	id_number: Joi.string(),
	company_name: Joi.string(),
	trade_name: Joi.string(),
	address: Joi.string(),
	fiscal_position: Joi.string(),
	account_obligated: Joi.string(),
	logo: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
    description: Joi.string(),
	max_ammount: Joi.number(),
	enviroment: Joi.string(),
	attempts_number: Joi.number(),
	deletedAt: Joi.string(),
	flagActive: Joi.boolean(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
	id: Joi.number(),
}).label('Created Company');

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
		description: 'Create company',
		notes: 'Create a company and return the created object',
		tags: ['api'],
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
				payloadType: 'form',
			},
		},
		pre: [
			{
				method: pre.validateByIdNumber,
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
