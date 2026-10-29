import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SuperadminLayout from "../../components/SuperadminLayout";

function SuperadminEnquiryDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchEnquiry = async () => {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5001/api/superadmin/enquiries/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setEnquiry(data.enquiry);

                await fetch(`http://localhost:5001/api/superadmin/enquiries/${id}/read`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            setLoading(false);
        };
        fetchEnquiry();
    }, [id]);

    if (loading) {
        return (
            <SuperadminLayout>
                <div className="flex justify-center py-20">
                    <p className="text-slate-600">Loading enquiry</p>
                </div>
            </SuperadminLayout>
        );
    }

    if (!enquiry) {
        return (
            <SuperadminLayout>
                <div className="py-20 text-center">
                    <p className="text-lg font-semibold text-slate-900">Enquiry not found</p>
                </div>
            </SuperadminLayout>
        );
    }

    const handleStatusChange = async (status) => {
        if (!enquiry) return;

        const token = localStorage.getItem("token");

        setUpdatingStatus(true);

        const response = await fetch(`http://localhost:5001/api/superadmin/enquiries/${enquiry._id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                status
            })
        });

        const data = await response.json();

        if (response.ok) {
            setEnquiry(data.enquiry);
            setShowStatusMenu(false);

        } else {
            console.error(data.message);
        }

        setUpdatingStatus(false);
    };

    const handleReply = async () => {
        if (!replyMessage.trim() || !enquiry) return;

        const token = localStorage.getItem("token");

        try{
            const response = await fetch(`http://localhost:5001/api/superadmin/enquiries/${enquiry._id}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: replyMessage
                })
            })
            const data = await response.json();

            if (response.ok) {
                setEnquiry(data.enquiry);
                setReplyMessage("");
            } else {
                console.error(data.message);
            }

        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    const handleDelete = async () => {
        if (!enquiry) return;

        const token = localStorage.getItem("token");

        setDeleting(true);

        try {
            const response = await fetch(`http://localhost:5001/api/superadmin/enquiries/${enquiry._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setShowDeleteModal(false);
                navigate("/superadmin/contact-enquiries");
            } else {
                console.error(data.message);
            }

        } catch (error) {
            console.error("Error deleting enquiry:", error);
        }
        setDeleting(false);
    };

    return (
        <SuperadminLayout>

            <div className="w-full max-w-6xl">

                <div className="mb-8 flex items-start justify-between">

                    <div>
                        <div className="text-4xl font-bold text-[#071A3D]">Enquiry Details</div>

                        <p className="mt-2 text-lg text-[#E78300]">
                            View the details of the selected enquiry
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        <div className="relative">

                            <button 
                            type="button"
                            onClick={() => setShowStatusMenu(!showStatusMenu)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                            >⋮</button>

                            {showStatusMenu && (
                                <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">

                                    <p className="px-3 py-2 text-xs font-semibold uppercase text-slate-400">Change Status</p>

                                    <button 
                                    type="button"
                                    onClick={() => handleStatusChange("pending")}
                                    disabled={updatingStatus}
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                                    >Pending</button>

                                    <button 
                                    type="button"
                                    onClick={() => handleStatusChange("replied")}
                                    disabled={updatingStatus}
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                                    >Replied</button>

                                    <button 
                                    type="button"
                                    onClick={() => handleStatusChange("closed")}
                                    disabled={updatingStatus}
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                                    >Closed</button>

                                    <div className="my-2 border-t border-slate-200"></div>

                                    <button 
                                    type="button"
                                    onClick={() => {
                                        setShowStatusMenu(false);
                                        setShowDeleteModal(true);
                                    }}
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                    >Delete</button>

                                </div>
                            )}

                        </div>

                        <button
                        type="button"
                        onClick={() => navigate("/superadmin/contact-enquiries")}
                        className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-medium text-[#071A3D] transition-colors hover:bg-orange-50"
                        >Back</button>

                    </div>
                    
                </div>
                        

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <div className="space-y-6">

                        <div>
                            <p className="text-sm font-medium text-slate-500">Name</p>

                            <p className="mt-1 text-slate-900">{enquiry.name}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">Email</p>

                            <p className="mt-1 text-slate-900">{enquiry.email}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">Subject</p>

                            <p className="mt-1 text-slate-900">{enquiry.subject}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">Message</p>

                            <p className="mt-2 rounded-xl bg-slate-50 p-4 text-slate-700">{enquiry.message}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">Status</p>

                            <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                enquiry.status === "pending"
                                ? "bg-blue-100 text-blue-700"
                                : enquiry.status === "replied"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"}`}>
                                {enquiry.status}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-slate-500">Date</p>

                            <p className="mt-1 text-slate-900">
                                {new Date(enquiry.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="mt-8 border-t border-slate-200 pt-6">

                            <h3 className="text-lg font-semibold text-slate-900">Reply to enquiry</h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Send a reply to {enquiry.email}
                            </p>

                            <textarea 
                            rows="5"
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Write your reply here..."
                            className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                            />

                            <div className="mt-4 flex justify-end">

                                <button 
                                type="button"
                                onClick={handleReply}
                                className="rounded-lg bg-[#E78300] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D97706]">Send Reply</button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {showDeleteModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">

                    <h2 className="text-xl font-bold text-slate-900">Delete Enquiry?</h2>

                    <p className="mt-3 text-slate-600">
                        Are you sure you want to delete this enquiry?
                    </p>

                    <div className="mt-6 flex justify-end gap-3">

                        <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Cancel</button>

                        <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                            {deleting ? "Deleting..." : "Delete"}
                        </button>

                    </div>

                </div>

            </div>
        )}
        </SuperadminLayout>
    )
}

export default SuperadminEnquiryDetails;