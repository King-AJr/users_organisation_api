const { createConnection } = require("typeorm");
const config = require("../ormconfig");

let connection;

async function initializeDatabase() {
  if (!connection) {
    connection = await createConnection(config);
  }
  return connection;
}

module.exports = {
  initializeDatabase
};

