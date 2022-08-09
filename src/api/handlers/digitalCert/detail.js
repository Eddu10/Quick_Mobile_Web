'use strict';

const Boom = require('@hapi/boom');
const DigitalCert = require('../../../models/DigitalCert');

async function handler(request) {
	try {
		const { id } = request.params;
		const digitalCert = await DigitalCert.getById(id);
		delete digitalCert.password;
		return digitalCert;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;