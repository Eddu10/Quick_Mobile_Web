'use strict';

const Boom = require('@hapi/boom');
const DigitalCert = require('../../../models/DigitalCert');

async function handler(request) {
	try {
		let data = request.payload;
		const digitalCert = await DigitalCert.edit(request.params.id, data);
		return digitalCert;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
