const jwt = require("jsonwebtoken")
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.generateToken = async (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    user.tokens.push(token)
    await user.save();
    return token;
}

exports.loginWithEmail = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error(`can not find user with email ${email}`)
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error("ko đúng password")
    }
    return user
}
// ask again
exports.requiresLogin = async (request, response, next) => {

    const token = request.body.token
    if (!token) {
        return response.status(401).json({
            message: "no token here"
        })
    }
    // use JWT library, have a decode, get information from database
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decode.id, tokens: token })
        if (!user) throw new Error("Unauthorized")
        // 
        request.user = user 
        request.token = token
        next()
    } catch (error) {
        return response.status(401).json({
            status: "Fail",
            message: "decode somth wrong"
        })
    }
}

exports.requiresHost = async (request, response, next) => {
    const user = request.user
    if (user.role != "Host") {
        return response.status(401).json({
            status: "Fail",
            message: "Host is wrong"
        })
    }
    next()
}
