let mongoose = require('mongoose');
let SCHEMA_ARTICLE = require('../schemas/sc_article');

let MOSEL_ARTICLE = mongoose.model('MOSEL_ARTICLE',SCHEMA_ARTICLE);

module.exports = MOSEL_ARTICLE;