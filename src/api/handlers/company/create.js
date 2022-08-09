'use strict';

const Boom = require('@hapi/boom');
const Company = require('../../../models/Company');

const saltRounds = process.env.SALT_ROUNDS || 10;

async function handler(request, h) {
	try {
		var newCompany = null;
		var data = request.payload;

		newCompany = await Company.create(data);

		if (newCompany) {
			return h.response(newCompany).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
