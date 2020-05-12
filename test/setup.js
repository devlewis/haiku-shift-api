const { expect } = require("chai");
const supertest = require("supertest");
process.env.NODE_ENV = "test";
process.env.TZ = "UCT";

require("dotenv").config();

process.env.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "postgresql://postgres@localhost/haiku_db_test";

global.expect = expect;
global.supertest = supertest;
