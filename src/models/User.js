'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class User extends baseModel {
	static get tableName() {
		return 'User';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['username', 'password'],
			properties: {
				username: {
					type: 'string',
				},
				password: {
					type: 'string',
				},
				email: {
					type: ['string', 'null'],
				},
				group: {
					type: ['string', 'null'],
				},
				description: {
					type: 'string',
				},
				...defaultProperties,
			},
		};
		return schema;
	}

	static get namedFilters() {
		return {
			selectColumns: (builder) => builder.select(this.defaultColumns()),
		};
	}

	static defaultColumns() {
		return ['id', 'username', 'email', 'group', 'description'];
	}

	static getById(id) {
		return this.query().findById(id);
	}

	static create(data) {
		return this.query().insert(data);
	}

	static getAll(filter = {}) {
		return this.query()
			.select(this.defaultColumns())
			.skipUndefined()
			.where('username', filter.username)
			.skipUndefined()
			.where('group', filter.group)
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static findByUsername(username) {
		return this.query()
			.select(['id', 'username', 'password', 'group'])
			.where('username', username)
			.first();
	}
}

module.exports = User;
