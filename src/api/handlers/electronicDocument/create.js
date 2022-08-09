'use strict';

const Boom = require('@hapi/boom');
const ElectronicDocument = require('../../../models/ElectronicDocument');

const saltRounds = process.env.SALT_ROUNDS || 10;

async function handler(request, h) {
	try {
		var newElectronicDocument = null;
		var data = request.payload;

		newElectronicDocument = await ElectronicDocument.create(data);

		if (newElectronicDocument) {
			return h.response(newElectronicDocument).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
