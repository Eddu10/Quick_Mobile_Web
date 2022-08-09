'use strict';

const Boom = require('@hapi/boom');
const ElectronicDocument = require('../../../models/ElectronicDocument');

async function handler(request) {
	try {
		const list = await ElectronicDocument.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
