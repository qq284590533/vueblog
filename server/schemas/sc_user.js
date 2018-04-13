let mongoose = require("mongoose")

let SCHEMA_USER = new mongoose.Schema({
    user_id: String,
    password: String,
    head_img: String,
    name: String,
    site_tit: String,
    site_desc: String,
    email: String,
    login_time: {
        type: Date,
        default: null
    },
    signup_time: {
        type: Date,
        default: null
    }

})

module.exports = SCHEMA_USER;