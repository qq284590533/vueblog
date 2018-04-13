let mongoose = require("mongoose")

let SCHEMA_CATEGORY = new mongoose.Schema({
    name: String,
    count: {
      type:Number,
      default:0
    }
})

module.exports = SCHEMA_CATEGORY;