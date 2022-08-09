'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class DigitalCert extends baseModel {
	static get tableName() {
		return 'DigitalCert';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['password', 'digital_cert'],
			properties: {
				password: {
					type: 'string',
				},
				digital_cert: {
					type: 'string',
				},
				company_id: {
					type: 'number',
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
		return ['id', 'password','digital_cert', 'company_id'];
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
			.where('password', filter.password)
			.skipUndefined()
			.where('digital_cert', filter.digital_cert)
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static findByPassword(password) {
		return this.query()
			.select(['id','company_id'])
			.where('password', password)
			.first();
	}
	static getCompanyCertId(id) {
        return this.query()
            .select(['id'])
            .where('id', id)
			.first();
    }
	
	
}

module.exports = DigitalCert;
