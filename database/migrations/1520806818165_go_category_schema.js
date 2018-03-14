'use strict'

const Schema = use('Schema')

class GoCategorySchema extends Schema {
  up () {
    this.table('gos', (table) => {
      // alter table
      table.integer('category').notNullable().defaultTo(1)

    })
  }

  down () {
    this.table('gos', (table) => {
      // reverse alternations
      table.dropColumn('category')
    })
  }
}

module.exports = GoCategorySchema
