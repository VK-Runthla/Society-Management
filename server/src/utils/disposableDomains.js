// src/utils/disposableDomains.js
const baseDomains = require("./baseDomains");
const externalDomains = require("./externalDomains");

// Merge & deduplicate
const disposableDomains = Array.from(
  new Set([...baseDomains, ...externalDomains])
);

module.exports = disposableDomains;
