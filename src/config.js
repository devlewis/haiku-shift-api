module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ORIGIN: "*",
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://postgres@localhost/haiku_db",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://postgres@localhost/haiku_db_test",
};
