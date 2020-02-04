const router = require("express").Router();
const elastic = require("../elastic/elastic-operations");

router.post("/", elastic.search);

module.exports = router;
