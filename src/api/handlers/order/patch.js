'use strict';

const Boom = require('@hapi/boom');
const Establishment = require('../../../models/Establishment');

async function handler(request) {
	try {
		let data = request.payload;
		await Establishment.edit(request.params.id, data);
		return "SUCCESS";
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
