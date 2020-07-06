const mongoose = require("mongoose")

const tagSchema = mongoose.Schema({
    tag:{
        type:String,
        require:[true,"title is required"],
        unique: true
    }
},{
    timestamps:true
})

const Tag = mongoose.model("Tag" , tagSchema)
module.exports = Tag;