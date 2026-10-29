import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";
import {createEnquiry, getEnquiries, getEnquiryCounts, getEnquiryById, markEnquiryRead, updateEnquiryStatus, replyToEnquiry, 
    deleteEnquiry} from "../controllers/superadminenquiryController.js";
    
const router = express.Router();

// create enquiry contact page
router.post("/enquiries", createEnquiry);

// get all enquires
router.get("/superadmin/enquiries", authMiddleware, roleMiddleware("superadmin"), getEnquiries);

//get enquries count
router.get("/superadmin/enquiries/counts", authMiddleware, roleMiddleware("superadmin"), getEnquiryCounts);

//view enquiry
router.get("/superadmin/enquiries/:id", authMiddleware, roleMiddleware("superadmin"), getEnquiryById);

//mark read
router.patch("/superadmin/enquiries/:id/read", authMiddleware, roleMiddleware("superadmin"), markEnquiryRead);

//status change
router.patch("/superadmin/enquiries/:id/status", authMiddleware, roleMiddleware("superadmin"), updateEnquiryStatus);

//send reply
router.post("/superadmin/enquiries/:id/reply", authMiddleware, roleMiddleware("superadmin"), replyToEnquiry);

//delete enquiry
router.delete("/superadmin/enquiries/:id", authMiddleware, roleMiddleware("superadmin"), deleteEnquiry);

export default router;





