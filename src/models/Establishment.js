'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class Establishment extends baseModel {
	static get tableName() {
		return 'Establishment';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['number', 'company_id'],
			properties: {
				number: {
					type: 'string',
				},
				address: {
					type: 'string',
				},
				comopany_id: {
					type: 'integer',
				},
				company_name: {
					type: 'string',
				},
				state: {
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
		return ['id', 'number', 'address', 'company_id', 'company_name', 'state'];
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
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static findByNumber(number) {
		return this.query()
			.select(['id', 'number'])
			.where('number', number)
			.first();
	}
}

module.exports = Establishment;
