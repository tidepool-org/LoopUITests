const screen = require("./screen");
const entries = require("../therapySettings/entriesScreen");
const entry = require("../therapySettings/entryScreen");

var base = {
  Screen: screen.Screen,
  screenTests: screen.tests,
  EntriesScreen: entries.Screen,
  entriesTests: entries.tests,
  EntryScreen: entry.Screen,
  entryTests: entry.tests,
};

module.exports = base;
