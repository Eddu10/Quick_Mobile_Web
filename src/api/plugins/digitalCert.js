'use strict';

const createRoute = require('../routes/digitalCert/create');
const deleteRoute = require('../routes/digitalCert/delete');
const detailRoute = require('../routes/digitalCert/detail');
const listRoute = require('../routes/digitalCert/list');
const patchRoute = require('../routes/digitalCert/patch');
const plugin = {
	name: 'digitalCert-table',
	version: '1.0.0',
	register: (server, options) => {
		server.route(createRoute);
		server.route(deleteRoute);
		server.route(detailRoute);
		server.route(listRoute);
		server.route(patchRoute);
	},
};

exports.plugin = plugin;