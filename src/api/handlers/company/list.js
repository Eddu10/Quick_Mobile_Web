'use strict';

const Boom = require('@hapi/boom');
const Company = require('../../../models/Company');

async function handler(request) {
	try {
		const list = await Company.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
