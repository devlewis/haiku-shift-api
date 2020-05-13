require("dotenv").config();

module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  connectionString:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : "postgresql://haiku_user1@localhost/haiku_db1",
};
