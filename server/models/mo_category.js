let mongoose = require('mongoose');
let SCHEMA_CATEGORY = require('../schemas/sc_category');

let MOSEL_CATEGORY = mongoose.model('MOSEL_CATEGORY',SCHEMA_CATEGORY);

module.exports = MOSEL_CATEGORY;