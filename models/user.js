const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    role:{
        type:String,
        require:[true,"role is required"]
    },

    introduction:{
        type:String
    },

    tokens:[{
        type:String
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User; // này là để User có thể dùng ở chỗ khác
//y nghia cau lenh tren la
// you can do this one User.find({}) = sth 