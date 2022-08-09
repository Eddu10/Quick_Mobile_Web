'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/company/detail');
const pre = require('../../pre/company');

const resultModel = Joi.object({
	id: Joi.number(),
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
	flagActive: Joi.boolean(),
	deletedAt: Joi.string(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
}).label('Company Detail');

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
		description: 'Detail company',
		notes: 'Returns the detail of a company',
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
