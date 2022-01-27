exports.up = async function(knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary();
        table.string("table_name").notNullable();
        table.integer("capacity").notNullable();
        table.boolean('occupied').notNullable().defaultTo(false)
        table.integer('reservation_id')
        table
          .foreign('reservation_id')
          .references('reservation_id')
          .inTable('reservations')
        table.timestamps(true, true);
    })
  };
  
  exports.down = async function(knex) {
    return knex.schema.dropTable("tables");
  };