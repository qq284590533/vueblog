let mongoose = require('mongoose');
let SCHEMA_TAG = require('../schemas/sc_tag');

let MOSEL_TAG = mongoose.model('MOSEL_TAG',SCHEMA_TAG);

module.exports = MOSEL_TAG;