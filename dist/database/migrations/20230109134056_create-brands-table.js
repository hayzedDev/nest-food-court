"use strict";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema
        .createTable('brands', (table) => {
        table.increments('id').primary().unique();
        table.string('brandName').notNullable().unique();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
        .createTable('categories', (table) => {
        table.increments('id').primary().unique();
        table.string('categoryName').unique();
        table
            .integer('brandNameId')
            .references('id')
            .inTable('brands')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
        .createTable('addon-meals', (table) => {
        table.increments('id').primary().unique();
        table.integer('price').notNullable();
        table
            .integer('categoryNameId')
            .references('id')
            .inTable('categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('addonMealName');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema
        .dropTableIfExists('addon-meals')
        .dropTableIfExists('categories')
        .dropTableIfExists('brands');
};
