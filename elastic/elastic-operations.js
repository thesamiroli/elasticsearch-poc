const elasticClient = require("./elastic-config").client;

function buildQuery(req) {
  let query = {};

  //Index to search
  query.index = "philosophers";

  //number of results
  query.size = 20;

  //Fields to search
  if (req.body.filters.searchOn === "all") {
    query.body = {
      query: {
        bool: {
          must: {
            multi_match: {
              query: req.body.searchTerm,
              fields: ["name", "books", "livedIn", "summary"],
              fuzziness: "AUTO"
            }
          }
        }
      }
    };
  } else {
    query.body = {
      query: {
        bool: {
          must: {
            match: {
              [req.body.filters.searchOn]: {
                query: req.body.searchTerm,
                fuzziness: "AUTO"
              }
            }
          }
        }
      }
    };
  }

  //Results to exclude
  if (req.body.filters.removeWord !== "") {
    console.log(query.body.query.bool);
    query.body.query.bool.must_not = {
      multi_match: {
        query: req.body.filters.removeWord,
        fields: ["name", "books", "livedIn", "summary"]
      }
    };
  }

  //Sorting operation
  if (req.body.filters.sortBy === "name")
    var sortBy = req.body.filters.sortBy + ".keyword";
  else if (req.body.filters.sortBy === "relevance") var sortBy = "_score";
  else var sortBy = req.body.filters.sortBy;
  let sort = sortBy + ":" + req.body.filters.sortType;
  //query.sort = ["name.keyword:asc"];
  query.sort = [sort];

  console.log("Query to be performed->, " + query);
  return query;
}

async function search(req, res, next) {
  console.log(req.body);
  let query = buildQuery(req);

  data = await elasticClient
    .search(query)
    .catch(err => console.log("Error in searching->", err.meta.body.error));
  console.log("Data from search->", data);
  let toSend = data.body.hits.hits;
  toSend.push({ time: data.body.took });
  console.log("Data to send-> ", toSend);
  res.status(data.statusCode).json(toSend);
}

module.exports = {
  search: search
};
