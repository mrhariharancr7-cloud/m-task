import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {type: String,
            required: true,
            unique: true,
    },

   password: {type: String,
    required:true
   },

    role: {
        type: String,
        default: "user"
    },

    startOfWeek: {
        type: String,
        default:"Monday"
    },

    showImportant: {
        type: Boolean,
        default: true
    },

    showCompleted: {
        type: Boolean,
        default: true
    },

    resetOtp: {
        type: String,
        default: null
    },

    resetOtpExpires: {
        type: Date,
        default: null
    }
});

const User = mongoose.model("User",userSchema);

export default User;