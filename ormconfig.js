const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [
      "db/entity/**/*.js"
    ],
    migrations: [
      "db/migration/**/*.js"
    ],
    cli: {
      entitiesDir: "db/model",
      migrationsDir: "db/migration"
    }
  };
  