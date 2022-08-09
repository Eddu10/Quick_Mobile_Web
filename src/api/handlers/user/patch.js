'use strict';

const Boom = require('@hapi/boom');
const User = require('../../../models/User');

async function handler(request) {
	try {
		let data = request.payload;
		delete data.confirmPassword;
		const user = await User.edit(request.params.id, data);
		return user;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
