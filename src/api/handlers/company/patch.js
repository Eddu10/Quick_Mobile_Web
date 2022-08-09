'use strict';

const Boom = require('@hapi/boom');
const Company = require('../../../models/Company');

async function handler(request) {
	try {
		let data = request.payload;
		const company = await Company.edit(request.params.id, data);
		return company;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
