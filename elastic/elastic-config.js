const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200/",
  maxRetries: 5,
  requestTimeout: 20000
});

module.exports = {
  client: client
};
