'use strict';

const Boom = require('@hapi/boom');
const DigitalCert = require('../../../models/DigitalCert');

async function handler(request) {
	try {
		const list = await DigitalCert.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
