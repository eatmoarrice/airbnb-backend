const Tag = require("../models/tag")


exports.getTag = async (request, response) => {
    try {
        const tagList = await Tag.find({})
        response.status(200).json({
            status: "Success",
            data: tagList
        })
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: "getTag is not run"
        })
    }
}

exports.createTag = async (request, response) => {
    try {
        const { tag } = request.body

        if (!tag) {
            return response.status(400).json({
                message: error.message
            })
        }

        const newTag = await Tag.create({
            tag: tag
        })

        response.status(200).json({
            status: "Success",
            data: newTag
        })


    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: "getTag is not run"
        })
    }
}


// ko hieu ne
exports.createTags = async (request, response) => {
    try {
        const tags = request.body.tags.map(t => t.trim());
        const tagIDs = tags.map(async e => {
            let tag = await Tag.findOne({ tag: e });
            if (tag) return tag;
            tag = await Tag.create({ tag: e });
            return tag;
        });
        const result = Promise.all(tagIDs); // execute all promises in the array
        return result;
    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: error.message
        });
    };
};

exports.deleteTag = async (request, response) => {
    try {
        const tag = await Tag.findByIdAndDelete({ _id: request.params.tagId });
        if (!tag) {
            throw new Error("Undefined tag");
        };
        response.status(200).json({
            status: "Success",
            data: null
        });

    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: "getTag is not run"
        })
    }
}

exports.updateTag = async (request, response) => {
    try {
        const { tag, token } = request.body
        if (!tag) {
            return response.status(400).json({
                status: "Fail",
                message: "no new title"
            })
        }
        if (!token) {
            return response.status(400).json({
                status: "Fail",
                message: "wrong token"
            })
        }

        const tag2 = await Tag.findOne({ tokens: token })

        if (tag2) {
            tag2.tag = tag
        }
        tag2.save()

        response.status(200).json({
            status: "Success",
            data: tag2
        })


    } catch (error) {
        response.status(400).json({
            status: "Fail",
            message: "updateTag is not run"
        })
    }
}