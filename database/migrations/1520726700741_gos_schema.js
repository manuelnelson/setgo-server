'use strict'

const Schema = use('Schema')

class GosSchema extends Schema {
  up () {
    this.create('gos', (table) => {
      table.increments('id')
      table.string('name', 80).notNullable().unique()
      table.dateTime('startDateTime')
      table.dateTime('endDateTime')
      table.integer('priority').notNullable().defaultTo(10)//1=highest priority, 10=medium priority, 100=low priority
      table.integer('points').notNullable().defaultTo(1)
      table.boolean('completed').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('parent').unsigned()//perhaps we should create an index here for performance
      table.timestamps()
    })
  }

  down () {
    this.drop('gos')
  }
}

module.exports = GosSchema
