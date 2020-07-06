const User = require("../models/user")
const { generateToken, loginWithEmail } = require("../services/authenticationServiec")
const bcrypt = require("bcrypt")
const { use } = require("../routes/users")
const { request } = require("express")
// lấy dữ liệu nên hơi khác
exports.getUserList = async (request, response) => {
    try {
        const userList = await User.find({}) // lấy hết tat ca
        response.status(200).json({
            userList
        })
    } catch (error) {
        response.status(400).json({
            message: "Error happens"
        })
    }
}
// try co vấn đề thì catch bắt đầu chạy


// tạo ra 1 cái dữ liệu
exports.createUser = async (request, response) => {
    try {


        const { name, email, password, role, introduction } = request.body
        if (!name || !email || !password || !role) {
            return response.status(400).json({
                message: "name, email, password, role are required"
            })
        }
        if (role === "Host") {
            if (!introduction) {
                return response.status(400).json({
                    status: "Fail",
                    message: "Host must have introduction"
                })
            }
        }
        const hashedPassword = await bcrypt.hash(request.body.password, 10)

        const user = await User.create({
            email: email,
            name: name,
            password: hashedPassword,
            role: role,
            introduction: introduction
        })

        const token = await generateToken(user)

        response.status(200).json({
            status: "success",
            data: { user, token }
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}


exports.login = async (request, response) => {
    try {
        // 1.check the validiti of data
        const { email, password } = request.body
        if (!email || !password) throw new Error("email or password are required")

        const user = await loginWithEmail(email, password)
        console.log(user)
        const token = await generateToken(user)

        response.status(200).json({
            status: "success",
            data: { user, token }
        })
    } catch (error) {
        response.status(400).json({
            message: error.message
        })
    }
}



exports.logout = async (request, response) => {
    // 1. lấy và kiễm tra tính khả dụng của thông tin từ clients
    // 2. kiểm tra và update thông tin trong database của mình
    // 3. trả lời lại cho clients
    try {
        const token = request.body.token
        if (!token) {
            response.status(400).json({
                status: "fail",
                message: "No token here"
            })
        }

        const user = await User.findOne({ tokens: token })

        user.tokens = user.tokens.filter(token => token != token)
        await user.save()
        response.status(200).json({
            status: "log out success",
            data: null
        })
    } catch (error) {
        response.status(400).json({
            status: "fail",
            message: " fail log out"
        })
    }

}

exports.updateUser = async (request, response) => {
    const { name, email, password, role, introduction, token } = request.body
    if (!name && !email && !password && !role && !introduction) {
        return response.status(400).json({
            status: "fail",
            message: "sao ko update gi het?"
        })
    }
    if (!token) {
        return response.status(400).json({
            status: "fail",
            message: "khong co token ne!"
        })
    }

    const user = await User.findOne({ tokens: token })

    if (name) {
        user.name = name
    }
    if (email) {
        user.email = email
    }
    if (password) {
        user.password = password
    }
    if (role) {
        user.role = role
    }
    if (introduction) {
        user.introduction = introduction
    }
    user.save()

    response.status(200).json({
        status: "success",
        data: user
    })
}




