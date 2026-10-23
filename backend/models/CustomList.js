import mongoose from "mongoose";

const customListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 40,
        },

        nameKey: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

customListSchema.index(
    { user: 1, nameKey: 1 },
    { unique: true }
);

const CustomList = mongoose.model("CustomList", customListSchema);

export default CustomList;