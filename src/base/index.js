const screen = require("./screen");
const entries = require("./entriesScreen");
const entry = require("./entryScreen");

var base = {
  Screen: screen.Screen,
  screenTests: screen.tests,
  EntriesScreen: entries.Screen,
  entriesTests: entries.tests,
  EntryScreen: entry.Screen,
  entryTests: entry.tests,
};

module.exports = base;
