'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class Company extends baseModel {
	static get tableName() {
		return 'Company';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['company_name', 'trade_name'],
			properties: {
				id_number: {
					type: 'string',
				},
				company_name: {
					type: 'string',
				},
				trade_name: {
					type: 'string',
				},
				address: {
					type: ['string', 'null'],
				},
				fiscal_position: {
					type: ['string', 'null'],
				},
				account_obligated: {
					type: ['string', 'null'],
				},
				logo: {
					type: ['string', 'null'],
				},
				phone: {
					type: ['string', 'null'],
				},
                email: {
					type: ['string', 'null'],
				},
                description: {
					type: ['string', 'null'],
				},
				max_ammount: {
					type: ['integer', 'null'],
				},
				enviroment: {
					type: ['string', 'null'],
				},
				attempts_number: {
					type: ['number', 'null'],
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
		return ['id', 'id_number','company_name', 'trade_name', 'address','fiscal_position','account_obligated','logo','phone','email', 'description','max_ammount','enviroment','attempts_number'];
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
			.where('id_number', filter.id_number)
			.skipUndefined()
			.where('company_name', filter.company_name)
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static getCompanyId(id) {
        return this.query()
            .select(['id'])
            .where('id', id)
    } 

	static getCompanyNumberId(id_number) {
		return this.query()
			.select(['id', 'id_number'])
			.where('id_number', id_number)
			.first();
	}
}

module.exports = Company;
