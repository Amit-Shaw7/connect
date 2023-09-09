import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: [true, "Name is required feild"],
    },
    cover : {
        type : String,
    },
    avatar : {
        type : String,
    },
    email: {
        type: String,
        required: [true, "Email is required feild"],
        unique: [true, "Email already exists"]
    },
    username: {
        type: String,
        required: [true, "Username is required feild"],
        unique: [true, "Username already taken , try another"],
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
    },
    website: {
        type: String,
    },
    role: {
        type: String,
        enum: {
            values: ['USER', 'ADMIN'],
            message: '{VALUE} role is not supported'
        },
        default: "USER"
    },
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    dislkedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    savedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
}, { timestamps: true });


const generateSalt = async (user, salt_factor, next) => {
    try {
        const salt = await bcryptjs.genSalt(salt_factor);
        return createHash(user, salt, next);
    } catch (error) {
        return next(error);
    }
}

const createHash = async (user, salt, next) => {
    try {
        const hashed = await bcryptjs.hash(user.password, salt);
        user.password = hashed;
        return next();
    } catch (error) {
        return next(error);
    }
}

UserSchema.pre('save', function (next) {
    const salt_factor = 5;
    if (!this.isModified("password")) {
        return next();
    }
    return generateSalt(this, salt_factor, next);
});

UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
    bcryptjs.compare(passwordAttempt, this.password, (err, isMatch) =>
        err ? cb(err) : cb(null, isMatch)
    )
}

const User = mongoose.model("User", UserSchema);
export default User;