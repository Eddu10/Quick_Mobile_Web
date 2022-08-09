'use strict';

const Boom = require('@hapi/boom');
const Company = require('../../../models/Company');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await Company.removeById(id);
		return "SUCCESSFULLY DELETED";
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}
module.exports = handler;
