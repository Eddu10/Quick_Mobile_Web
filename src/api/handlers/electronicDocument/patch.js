'use strict';

const Boom = require('@hapi/boom');
const ElectronicDocument = require('../../../models/ElectronicDocument');

async function handler(request) {
	try {
		let data = request.payload;
		await ElectronicDocument.edit(request.params.id, data);
		return "SUCCESS";
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
