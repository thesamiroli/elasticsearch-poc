const client = require("./elastic-config").client;

function getDemoData() {
  const fs = require("fs");
  let rawdata = fs.readFileSync("philosopher.json");
  let philosopher = JSON.parse(rawdata);
  addDemoData(philosopher);
}

async function addDemoData(data) {
  await client.index({
    index: "philosophers",
    body: {
      name: data.name,
      born: data.born,
      died: data.died,
      livedIn: data.livedIn,
      books: data.books,
      summary: data.summary
    }
  });
}
module.exports = {
  getDemoData: getDemoData
};
