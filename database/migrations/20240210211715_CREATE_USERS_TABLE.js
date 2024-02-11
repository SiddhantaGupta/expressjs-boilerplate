import { timestamps, onUpdateTrigger } from '../utilities/timestamps.js';

const tableName = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    const migration = await knex.schema.createTable(tableName, function (table) {
        table.bigIncrements('id').primary();
        table.uuid('uuid').defaultTo(knex.raw('gen_random_uuid()')).notNullable();
        table.string('email').notNullable().unique().index();
        table.string('password').notNullable();
        table.integer('role').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.boolean('is_deleted').notNullable().defaultTo(false);
        timestamps(knex, table);
    });
    await knex.raw(onUpdateTrigger(tableName));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    return knex.schema.dropTableIfExists(tableName);
};
