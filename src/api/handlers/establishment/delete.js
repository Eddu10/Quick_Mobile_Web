'use strict';

const Boom = require('@hapi/boom');
const Establishment = require('../../../models/Establishment');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await Establishment.removeById(id);
		return "SUCCESSFULLY DELETED";
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
