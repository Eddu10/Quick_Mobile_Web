'use strict';

const Boom = require('@hapi/boom');
const DigitalCert = require('../../../models/DigitalCert');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS || 10;


async function handler(request, h) {
	try {
		var newDigitalCert = null;
		var data = request.payload;
		var cifrado = await bcrypt.hash(request.payload.password, saltRounds);// crifado
		data.password = cifrado;
		newDigitalCert = await DigitalCert.create(data);
		if (newDigitalCert){ 
			return h.response(newDigitalCert).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
