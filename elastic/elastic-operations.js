const elasticClient = require("./elastic-config").client;

async function getAllPhilosophers(req, res, next) {
  console.log("Get all Philosophers");
  let data = await elasticClient.search({
    index: "philosophers"
  });
  res.status(200).json(data.body.hits.hits);
}

async function search(req, res, next) {
  console.log("Search----------------------");
  console.log(req.body);
  let data = {};

  if (req.body.searchBy === "everything") {
    data = await elasticClient.search({
      index: "philosophers",
      body: {
        query: {
          multi_match: {
            query: req.body.searchTerm,
            fields: ["name", "books", "livedIn", "summary"]
          }
        }
      }
    });
  } else {
    data = await elasticClient.search({
      index: "philosophers",
      body: {
        query: {
          match: {
            [req.body.searchBy]: req.body.searchTerm
          }
        }
      }
    });
  }
  res.status(200).json(data.body.hits.hits);
}

module.exports = {
  getAllPhilosophers: getAllPhilosophers,
  search: search
};
