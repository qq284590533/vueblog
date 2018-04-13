let mongoose = require("mongoose")

let SCHEMA_ARTICLE = new mongoose.Schema({
    title: String,          //标题
    abstract: String,       //摘要
    publish_time: {         //创建时间
        type: Date,
        default: null
    },
    aCategory: {         //分类
        type: Array,
        default: []
    },
    aTag: {              //标签
        type: Array,
        default: []
    },
    content: String,
    published:{          //是否已发表，如果已发表的，显示在博客列表中，否则显示在草稿列表中。
        type: Boolean,
        default: false
    },
    about:{
        type: Boolean,
        default: false
    }
})

module.exports = SCHEMA_ARTICLE;