'use strict';

const Boom = require('@hapi/boom');
const Company = require('../../../models/Company');

async function handler(request) {
	try {
		const { id } = request.params;
		const company = await Company.getById(id);
		delete company.id_number;
		return company;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}
module.exports = handler;