const screen = require('./screen');
const entries = require('./entriesScreen');
const entry = require('./entryScreen');

var base = {
  Screen: screen.Screen,
  EntriesScreen: entries.Screen,
  EntryScreen: entry.Screen,
};

module.exports = base;
