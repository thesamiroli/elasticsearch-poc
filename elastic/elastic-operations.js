const elasticClient = require("./elastic-config").client;

async function getAllPhilosophers(req, res, next) {
  let data = await elasticClient.search({
    index: "philosophers"
  });
  res.status(200).json(data.body.hits.hits);
}

async function search(req, res, next) {
  if (req.body.filters.sortBy === "name")
    var sortBy = req.body.filters.sortBy + ".keyword";
  else if (req.body.filters.sortBy === "relevance") var sortBy = "_score";
  else var sortBy = req.body.filters.sortBy;
  let data = {};

  if (req.body.filters.searchOn === "all") {
    data = await elasticClient
      .search({
        index: "philosophers",
        body: {
          query: {
            multi_match: {
              query: req.body.searchTerm,
              fields: ["name", "books", "livedIn", "summary"]
            }
          },
          sort: [{ [sortBy]: req.body.filters.sortType }]
        }
      })
      .catch(err => console.log("Err", err.meta.body.error));
    res.status(200).json(data.body.hits.hits);
  } else {
    data = await elasticClient
      .search({
        index: "philosophers",
        body: {
          query: {
            match: {
              [req.body.filters.searchOn]: req.body.searchTerm
            }
          }
        }
      })
      .catch(err => console.log("Err", err));
    res.status(200).json(data.body.hits.hits);
  }
}

module.exports = {
  getAllPhilosophers: getAllPhilosophers,
  search: search
};
