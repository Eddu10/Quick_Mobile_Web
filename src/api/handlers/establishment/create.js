'use strict';

const Boom = require('@hapi/boom');
const Establishment = require('../../../models/Establishment');

const saltRounds = process.env.SALT_ROUNDS || 10;

async function handler(request, h) {
	try {
		var newEstablishment = null;
		var data = request.payload;

		newEstablishment = await Establishment.create(data);

		if (newEstablishment) {
			return h.response(newEstablishment).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
