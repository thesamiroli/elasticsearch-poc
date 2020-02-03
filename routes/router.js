const router = require("express").Router();
const elastic = require("../elastic/elastic-operations");

router.post("/", elastic.search);
router.get("/", elastic.getAllPhilosophers);

module.exports = router;
