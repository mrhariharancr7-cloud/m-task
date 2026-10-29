import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperadminLayout from "../../components/SuperadminLayout";

function SuperadminContactQueries() {

    const navigate = useNavigate();
    const [enquiries, setEnquiries] = useState([]);
    const [filter, setFilter] = useState("all");
    
    
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

    return (
        <SuperadminLayout>

            <div>

                <h2 className="text-4xl font-bold text-[#071A3D]">
                    Contact Queries section
                </h2>

                <p className="mt-2 text-lg text-orange-400">
                    Message enquiries submitted through the M-Task contact form
                </p>

                <div className="mt-8 overflow-x-auto rounded-2xl border border-orange-100 bg-white shadow-sm">

                    {/*enquiriesfilter-button*/}
                    <div className="px-6 py-5 border-b border-slate-200">

                        <div className="flex items-center gap-2">

                            <button 
                            onClick={() => setFilter("all")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "all"
                                ? "bg-[#E78300] text-white shadow-sm"
                                : "bg-white text-[#071A3D] border border-orange-100 hover:bg-orange-50"}`}>
                                All
                            </button>

                            <button 
                            onClick={() => setFilter("unread")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "unread"
                                ? "bg-[#E78300] text-white shadow-sm"
                                : "bg-white text-[#071A3D] border border-orange-100 hover:bg-orange-50"}`}>
                                Unread
                            </button>

                            <button 
                            onClick={() => setFilter("pending")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "pending"
                                ? "bg-[#E78300] text-white shadow-sm"
                                : "bg-white text-[#071A3D] border border-orange-100 hover:bg-orange-50"}`}>
                                Pending
                            </button>

                            <button 
                            onClick={() => setFilter("replied")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "replied"
                                ? "bg-[#E78300] text-white shadow-sm"
                                : "bg-white text-[#071A3D] border border-orange-100 hover:bg-orange-50"}`}>
                                Replied
                            </button>

                            <button 
                            onClick={() => setFilter("closed")}
                            className={`px-5 py-2 rounded-lg text-sm font-medium ${
                                filter === "closed"
                                ? "bg-[#E78300] text-white shadow-sm"
                                : "bg-white text-[#071A3D] border border-orange-100 hover:bg-orange-50"}`}>
                                Closed
                            </button>
 
                        </div>

                    </div>

                    {/*enquiries-Table*/}
                    <table className="w-full text-left">

                        <thead>

                            <tr className="border-b border-orange-100 bg-orange-50/50">

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
                                className="border-b border-slate-100 transition-colors hover:bg-orange-50/50">

                                    <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.name}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.email}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.subject}</td>

                                    <td className="px-6 py-4">

                                        <span
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                            enquiry.status === "pending"
                                            ? "bg-blue-100 text-blue-700"
                                            : enquiry.status === "replied"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"}`}>
                                                {enquiry.status}
                                            </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {new Date(enquiry.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <button
                                        onClick={() => navigate(`/superadmin/contact-enquiries/${enquiry._id}`)}
                                        className="inline-block rounded-md px-6 py-2 text-sm font-semibold text-[#E78300] transition-colors hover:bg-orange-50 hover:text-[#D97706]">
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

            
        </SuperadminLayout>
    );
}

export default SuperadminContactQueries;