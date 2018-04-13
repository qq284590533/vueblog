let mongoose = require('mongoose');
let SCHEMA_USER = require('../schemas/sc_user');

let MOSEL_USER = mongoose.model('MOSEL_USER',SCHEMA_USER);

module.exports = MOSEL_USER;