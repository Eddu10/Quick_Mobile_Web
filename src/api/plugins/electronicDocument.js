'use strict';

const createRoute = require('../routes/ElectronicDocument/create');
const deleteRoute = require('../routes/ElectronicDocument/delete');
const detailRoute = require('../routes/ElectronicDocument/detail');
const listRoute = require('../routes/ElectronicDocument/list');
const patchRoute = require('../routes/ElectronicDocument/patch');

const plugin = {
	name: 'electronicDocument-table',
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
