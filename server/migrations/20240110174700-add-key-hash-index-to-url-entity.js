'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE INDEX url_entries_alias_hash_index ON url_entries USING hash(alias);
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS url_entries_alias_hash_index;
    `);
  },
};
