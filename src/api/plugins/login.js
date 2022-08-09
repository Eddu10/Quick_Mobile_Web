'use strict';

const login = require('../routes/login/login');

const plugin = {
	name: 'login',
	version: '1.0.0',
	register: (server, options) => {
		server.route(login);
	},
};

exports.plugin = plugin;
