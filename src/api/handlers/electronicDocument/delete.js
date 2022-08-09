'use strict';

const Boom = require('@hapi/boom');
const ElectronicDocument = require('../../../models/ElectronicDocument');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await ElectronicDocument.removeById(id);

		return "SUCCESSFULLY DELETED";
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
