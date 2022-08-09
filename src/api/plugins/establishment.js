'use strict';

const createRoute = require('../routes/establishment/create');
const deleteRoute = require('../routes/establishment/delete');
const detailRoute = require('../routes/establishment/detail');
const listRoute = require('../routes/establishment/list');
const patchRoute = require('../routes/establishment/patch');

const plugin = {
	name: 'establishment-table',
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
