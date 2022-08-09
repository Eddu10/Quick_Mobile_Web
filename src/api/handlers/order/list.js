'use strict';

const Boom = require('@hapi/boom');
const Establishment = require('../../../models/Establishment');

async function handler(request) {
	try {
		const list = await Establishment.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
