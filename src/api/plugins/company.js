'use strict';

const createRoute = require('../routes/company/create');
const deleteRoute = require('../routes/company/delete');
const detailRoute = require('../routes/company/detail');
const listRoute = require('../routes/company/list');
const patchRoute = require('../routes/company/patch');
const plugin = {
	name: 'company-table',
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