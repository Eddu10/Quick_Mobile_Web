'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class ElectronicDocument extends baseModel {
	static get tableName() {
		return 'ElectronicDocument';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['company_id', 'doc_number', 'access_key', 'auth_number'],
			properties: {
				company_id: {
					type: 'integer',
				},
				doc_number: {
					type: 'string',
				},
				access_key: {
					type: 'string',
				},
				auth_number: {
					type: 'string',
				},
				xml_content: {
					type: ['string', 'null'],
				},
                state: {
                    type: ['string', 'null'],
                },
                auth_date: {
                    type: ['object', 'null'],
                },
                last_attempt_date: {
                    type: ['object', 'null'],
                },
                attempt_number: {
                    type: ['integer', 'null'],
                },
                issue_date: {
                    type: ['object', 'null'],
                },
                xml_auth: {
                    type: ['string', 'null'],
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
		return ['id', 'company_id', 'doc_number', 'access_key', 'auth_number', 'state', 'auth_date', 'last_attempt_date', 'attempt_number', 'issue_date'];
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
			.where('doc_number', filter.doc_number)
			.skipUndefined()
			.where('access_key', filter.access_key)
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static findByDocNumber(doc_number) {
		return this.query()
			.select(['id', 'doc_number'])
			.where('doc_number', doc_number)
			.first();
	}

	static findByAccessKey(access_key) {
		return this.query()
			.select(['id', 'access_key'])
			.where('access_key', access_key)
			.first();
	}

	static findByAuthNumber(auth_number) {
		return this.query()
			.select(['id', 'auth_number'])
			.where('auth_number', auth_number)
			.first();
	}
}

module.exports = ElectronicDocument;
