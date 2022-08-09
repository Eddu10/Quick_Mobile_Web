'use strict';

const Boom = require('@hapi/boom');
const DigitalCert = require('../../../models/DigitalCert');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await DigitalCert.removeById(id);
		return "SUCCESSFULLY DELETED";
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
