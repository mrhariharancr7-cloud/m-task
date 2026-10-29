import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

//create send enquire in contact page
export const createEnquiry = async (req, res) => {
    try {
        const{ name, email, subject, message} = req.body

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "All fields are required to send message"
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                message: "Please enter the valid email"
            });
        }

        const enquiry = new Enquiry({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        await enquiry.save();

        try{
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: enquiry.email,
                subject: "We have received your enquiry about M-Task",
                text: `Hi ${enquiry.name},

            Thank you for contacting M-Task. We have received your enquiry "${enquiry.subject}" and our team will get back to you soon

            Regards,
            M-task Team`
            });

        } catch (error) {
            console.error("Confirmation email failed:", error);
        }

        res.status(201).json({
            message: "Your enquiry has been sent successfully",
            enquiry
        });

    } catch (error) {
        console.error("Error creating enquiry:", error);

        res.status(500).json({
            message:"Failed to send enquiry"
        });
    }
};

//get all enquiries data in filter 

export const getEnquiries = async (req, res) => {
    try {
        const { filter = "all" } = req.query;

        const allowedFilters = ["all","unread","pending","replied","closed"];

        if (!allowedFilters.includes(filter)) {
            return res.status(400).json({
                message: "Invalid enquiry filter"
            });
        }

        let enquiryFilter = {};

        if (filter === "unread") {
            enquiryFilter = {
                isRead: false
            };
        }

        if (filter === "pending" || filter === "replied" || filter === "closed") {
            enquiryFilter = {
                status: filter
            };
        }

        const enquiries = await Enquiry.find(enquiryFilter).sort({ createdAt: -1 });

        const counts = {
            all: await Enquiry.countDocuments({}),

            unread: await Enquiry.countDocuments({isRead: false}),

            pending: await Enquiry.countDocuments({status: "pending"}),

            replied: await Enquiry.countDocuments({status: "replied"}),

            closed: await Enquiry.countDocuments({status: "closed"}),
        };

        res.status(200).json({enquiries,counts});

    } catch (error) {

        console.error("Error fetching enquiries:", error);

        res.status(500).json({
            message: "Failed to fetch enquiries"
        });
    }
};

//enquiries count
export const getEnquiryCounts = async (req, res) => {
    try {
        const counts = {
            all: await Enquiry.countDocuments({}),

            unread: await Enquiry.countDocuments({isRead: false}),

            pending: await Enquiry.countDocuments({status: "pending"}),

            replied: await Enquiry.countDocuments({status: "replied"}),

            closed: await Enquiry.countDocuments({status: "closed"}),

        };

        res.status(200).json({
            counts
        });

    } catch (error) {
        console.error("Error fetching enquiry counts:", error);

        res.status(500).json({
            message: "Failed to fetch enquiry counts"
        });
    }
};

// view enquiry details
export const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                message:"Enquiry not found"
            });
        }

        res.status(200).json({
            enquiry
        });

    } catch (error) {
        console.error("Error fecthing enquiry",error);

        res.status(500).json({
            message: "Failed to  fecth enquiry"
        });
    }
};

//mark read enquiry
export const markEnquiryRead = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id,{ isRead: true },{ new: true });

        if (!enquiry) {
            return res.status(404).json({
                message:"Enquiry not found"
            });
        }

        res.status(200).json({
            message: "Enquiry marked as read",
            enquiry
        });
    } catch (error) {
        console.error("Error marking enquiry as read:", error);

        res.status(500).json({
            message: "Failed to mark enquiry as read"
        });
    }
};

//update enquiry staus
export const updateEnquiryStatus = async (req, res) => {
    try {
        const {status} = req.body;
        
        const allowedStatuses = ["pending","replied","closed"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid enguiry status'
            });
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                message:"Enquiry not found"
            });
        }

        res.status(200).json({
            message: "Enquiry status updated successfully",
            enquiry
        });

    } catch (error) {
        console.error("Error updating enquiry status:", error);

        res.status(500).json({
            message: "Failed to update enquiry status"
        });
    }
};

//sendreply mail 
export const replyToEnquiry = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Reply message is required"
            });
        }

        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                message: "Enquiry not found"
            });
        }

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: enquiry.email,
            subject: `Re: ${enquiry.subject}`,
            text: `Hi ${enquiry.name},


        ${message}


        Regards,
        M-task Team`
        });

        enquiry.status = "replied";
        enquiry.isRead = true;

        await enquiry.save();
        res.status(200).json({
            message: "Reply sent successfully",
            enquiry
        });

    } catch (error) {
        console.error("Error sending enquiry reply:", error);

        res.status(500).json({message: "Failed to send reply"});
    }
};

// delete enquiry
export const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                message:"Enquiry not found"
            });
        }

        res.status(200).json({
            message: "Enquiry deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting enquiry:", error);

        res.status(500).json({
            message: "Failed to delete enquiry"
        });
    }
};