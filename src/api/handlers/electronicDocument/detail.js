'use strict';

const Boom = require('@hapi/boom');
const ElectronicDocument = require('../../../models/ElectronicDocument');

async function handler(request) {
	try {
		const { id } = request.params;
		const electronicDocument = await ElectronicDocument.getById(id);
		return electronicDocument;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
