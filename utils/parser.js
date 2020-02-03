const express = require("express");

const parser = function(app) {
  app.use(
    express.urlencoded({
      extended: true
    })
  );

  app.use(express.json());
};

module.exports = parser;
