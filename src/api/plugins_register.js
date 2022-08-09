'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const usersRoute = require('./plugins/user');
const loginRoute = require('./plugins/login');
const companyRoute = require('./plugins/company');
const establishmentRoute = require('./plugins/establishment');
const electronicDocumentRoute = require('./plugins/electronicDocument');
const digitalCertRoute = require('./plugins/digitalCert');

const swaggerOptions = {
	info: {
		title: 'Hapi Template API Documentation',
		description: 'This is a sample example of API documentation.',
	},
	securityDefinitions: {
		jwt: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header',
			'hapiSwagger.keyPrefix': 'Bearer ',
		},
	},
	security: [{ jwt: [] }],
};

const plugins = [
	Inert,
	Vision,
	{
		plugin: HapiSwagger,
		options: swaggerOptions,
	},
	{
		plugin: usersRoute,
		routes: {
			prefix: '/user',
		},
	},
	{
		plugin: loginRoute,
		routes: {
			prefix: '/login',
		},
	},
	{
		plugin: companyRoute,
		routes: {
			prefix: '/company',
		},
	},
	{
		plugin: orderRoute,
		routes: {
			prefix: '/order',
		},
	},
	{
		plugin: electronicDocumentRoute,
		routes: {
			prefix: '/electronicDocument',
		},
	},
	{
		plugin: digitalCertRoute,
		routes: {
			prefix: '/digitalCert',
		},
	},
];

module.exports = plugins;
