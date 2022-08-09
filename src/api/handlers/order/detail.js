'use strict';

const Boom = require('@hapi/boom');
const Establishment = require('../../../models/Establishment');

async function handler(request) {
	try {
		const { id } = request.params;
		const establishment = await Establishment.getById(id);
		return establishment;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
