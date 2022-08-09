'use strict';

const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

async function handler(request, h) {
	try {
		const credentials = request.auth.credentials;
		const token = Jwt.token.generate(
			{
				user: credentials.username,
				group: credentials.group,
			},
			{
				key: 'iu1S04Jz1T$^e1rg49&Hf1&FnM$*ViufCNsV%mMIx^NH6rC496',
				algorithm: 'HS512',
			},
			{
				ttlSec: 14400,
			},
		);
		return { token };
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;
