import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postText: {
        type: String,
        required: true,
    },
    media: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
export default Post;