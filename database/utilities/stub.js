import { timestamps, onUpdateTrigger } from '../utilities/timestamps.js';

const tableName = '';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    const migration = await knex.schema.createTable(tableName, function (table) {
        table.bigIncrements('id').primary();
        table.uuid('uuid').defaultTo(knex.raw('gen_random_uuid()')).notNullable();
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
