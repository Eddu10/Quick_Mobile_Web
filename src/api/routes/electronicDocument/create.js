'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/electronicDocument/create');
const pre = require('../../pre/electronicDocument');

const resultModel = Joi.object({
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
	deletedAt: Joi.string(),
	flagActive: Joi.boolean(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
	id: Joi.number(),
}).label('Created Electronic Document');

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
		description: 'Create electronic document',
		notes: 'Create an electronic document and return the created object',
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

			{
				method: pre.validateByDocNumber,
			},

			{
				method: pre.validateByAccessKey,
			},

			{
				method: pre.validateByAuthNumber,
			},
		],
		validate: {
			failAction,
			payload: Joi.object({
				company_id: Joi.number().required(),
				doc_number: Joi.string().required().max(50),
				access_key: Joi.string().required().max(50),
				auth_number: Joi.string().required().max(50),
				xml_content: Joi.string(),
				state: Joi.string().max(10),
				auth_date: Joi.date(),
				last_attempt_date: Joi.date(),
				attempt_number: Joi.number(),
				issue_date: Joi.date(),
				xml_auth: Joi.string(),
			}),
		},
	},
};

module.exports = route;
