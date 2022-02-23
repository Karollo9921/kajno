module.exports = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 4000,
  },
  dbConfig: {
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: process.env.DATABASE_DB || "GetnowX",
    host: process.env.DATABASE_HOST || "db",
    port: process.env.DATABASE_PORT || 3306,
    dialect: "mysql",
    migrationStorageTableName: "migrations",
  },
};
