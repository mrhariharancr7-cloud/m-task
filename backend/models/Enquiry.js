import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    subject: {
        type: String,
        required: true,
        trim: true
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ["pending","replied","closed"],
        default:"pending"
    },

    isRead: {
        type: Boolean,
        default: false
    }
},{ timestamps: true

});

enquirySchema.index({createdAt: -1});
enquirySchema.index({status: 1});
enquirySchema.index({isRead: 1});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;