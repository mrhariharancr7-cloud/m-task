import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperadminLayout from "../components/SuperadminLayout";

function SuperadminContactQueries() {

    const navigate = useNavigate();
    const [enquiries, setEnquiries] = useState([]);
    const [filter, setFilter] = useState("all");
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    useEffect(() => {
        const fetchEnquiries = async () => {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5001/api/superadmin/enquiries?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setEnquiries(data.enquiries);
            }
        };
        fetchEnquiries();
    }, [filter]);

    const handleViewEnquiry = async (id) => {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:5001/api/superadmin/enquiries/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            
            const readResponse = await fetch(`http://localhost:5001/api/superadmin/enquiries/${id}/read`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const readData = await readResponse.json();

            if (readResponse.ok) {
                setSelectedEnquiry(readData.enquiry);
            }
        }
    };

    const handleStatusChange = async (status) => {
        if (!selectedEnquiry) return;

        const token = localStorage.getItem("token");

        setUpdatingStatus(true);

        const response = await fetch(`http://localhost:5001/api/superadmin/enquiries/${selectedEnquiry._id}/status`, {
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
            setSelectedEnquiry(data.enquiry);

            setEnquiries((prevEnquiries) =>
                prevEnquiries.map((enquiry) =>
                    enquiry._id === data.enquiry._id ? data.enquiry: enquiry ));

            setShowStatusMenu(false);

        } else {
            console.error(data.message);
        }

        setUpdatingStatus(false);
    };

    return (
        <SuperadminLayout>

            <div>

                <h2 className="text-4xl font-bold text-slate-900">
                    Contact Queries section
                </h2>

                <p className="mt-2 text-lg text-teal-700">
                    Message enquiries submitted through the M-Task contact form
                </p>

                <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">

                    {/*enquiriesfilter-button*/}
                    <div className="px-6 py-5 border-b border-slate-200">

                        <div className="flex items-center gap-2">

                            <button 
                            onClick={() => setFilter("all")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "all"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                All
                            </button>

                            <button 
                            onClick={() => setFilter("unread")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "unread"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                Unread
                            </button>

                            <button 
                            onClick={() => setFilter("pending")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "pending"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                Pending
                            </button>

                            <button 
                            onClick={() => setFilter("replied")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "replied"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                Replied
                            </button>

                            <button 
                            onClick={() => setFilter("closed")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "closed"
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                                Closed
                            </button>
 
                        </div>

                    </div>

                    {/*enquiries-Table*/}
                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-slate-200">

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">#</th>

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Name</th>

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Email</th>

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Subject</th>

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Status</th>

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Date</th>

                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                           {enquiries.length === 0 ? (

                            <tr>
                                <td 
                                colSpan="7"
                                className="px-6 py-16 text-center">

                                    <p className="text-lg font-semibold text-slate-900">
                                        No enquiries found
                                    </p>
                                </td>
                            </tr>

                           ) : (
                            enquiries.map((enquiry, index) => (

                                <tr
                                key={enquiry._id}
                                className="border-b border-slate-200">

                                    <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.name}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.email}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.subject}</td>

                                    <td className="px-6 py-4">

                                        <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            enquiry.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : enquiry.status === "replied"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-slate-100 text-slate-700"}`}>
                                                {enquiry.status}
                                            </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {new Date(enquiry.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <button
                                        onClick={() => navigate(`/superadmin/contact-enqueries/${enquiry._id}`)}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                                            View
                                        </button>

                                    </td>

                                </tr>
                            ))

                           )}

                        </tbody>

                    </table>

                </div>

            </div>

            {selectedEnquiry && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Enquiry Details</h2>

                            <div className="relative">
                                <button
                                type="button"
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                >⋮</button>

                                {showStatusMenu && (
                                    <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">

                                        <p className="px-3 py-2 text-xs font-semibold uppercase text-slate-400">
                                            Change Status
                                        </p>

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


                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">

                            <div>
                                <p className="text-sm font-medium text-slate-500">Name</p>

                                <p className="mt-1 text-slate-900">{selectedEnquiry.name}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Email</p>

                                <p className="mt-1 text-slate-900">{selectedEnquiry.email}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Subject</p>

                                <p className="mt-1 text-slate-900">{selectedEnquiry.subject}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Message</p>

                                <p className="mt-1 text-slate-700">{selectedEnquiry.message}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Status</p>

                                <p className="mt-1 text-slate-900">{selectedEnquiry.status}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-500">Date</p>

                                <p className="mt-1 text-slate-900">
                                    {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">

                            <button 
                            onClick={() => {
                                setSelectedEnquiry(null);
                                setShowStatusMenu(false);
                            }}
                            className="bg-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-700">
                                Close
                            </button>

                        </div>

                    </div>
                </div>
            )}

            
        </SuperadminLayout>
    );
}

export default SuperadminContactQueries;