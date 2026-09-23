import { useEffect, useState } from "react";
import SuperadminLayout from "../components/SuperadminLayout";

function SuperadminUsers() {

    const [users, setUsers] = useState([]);
    const [deleteUser, setDeleteUser] = useState(null);
    const [roleUser, setRoleUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5001/api/superadmin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();

    }, []);

    const handleBlockUser = async (userId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5001/api/superadmin/users/${userId}/block`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();

            if (response.ok) {
                setUsers((currentUsers) =>
                    currentUsers.map((user) =>
                        user._id === userId ? data.user : user
                    )
                );
            }
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5001/api/superadmin/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setUsers((currentUsers) =>
                    currentUsers.filter((user) => user._id !== userId)
                );
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleChangeRole = async (userId, newRole) => {
        const token = localStorage.getItem("token");

        try{
            const response = await fetch(
                `http://localhost:5001/api/superadmin/users/${userId}/role`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        role: newRole
                    })
                }
            );
            const data = await response.json();

            if (response.ok) {
                setUsers((currentUsers) =>
                    currentUsers.map((user) =>
                        user._id === userId ? data.user : user
                    )
                );
                setRoleUser(null);    
            }
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    return (
    <SuperadminLayout>

        <div>

            <h2 className="text-4xl font-bold text-slate-900">
                User Management Section
            </h2>

            <p className="mt-2 text-lg text-teal-700">
                Manage users and account status
            </p>

            <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">

                <table className="w-full text-left">

                    <thead>
                        <tr className="border-b border-slate-200">

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">User-name</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Email</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Role</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Status</th>

                            <th className="px-6 py-4 text-sm font-medium text-slate-500">Actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                
                                <td
                                colSpan="5"
                                className="px-6 py-12 text-center">

                                    <p className="text-lg font-semibold text-slate-900">
                                        No users found
                                    </p>

                                    <p lassName="mt-2 text-sm text-slate-500">
                                        There is no users available
                                    </p>

                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="border-b border-slate-200">

                                    <td className="px-6 py-4 text-sm text-slate-900">{user.name}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>

                                    <td className="px-6 py-4 text-sm text-slate-600">{user.role}</td>

                                    <td className="px-6 py-4">
                                        <span
                                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${user.isBlocked
                                            ? "bg-red-100 text-red-700": "bg-green-100 text-green-700"}`}>
                                                {user.isBlocked ? "Blocked" : "Active"}
                                            </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                        
                                        <button 
                                        onClick={() => setRoleUser(user)}
                                        className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                                            Change Role
                                        </button>
                                            
                                        <button 
                                        onClick={() => handleBlockUser(user._id)}
                                        className="border border-teal-600 text-teal-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-teal-50">
                                            {user.isBlocked ? "Activate" : "Block"}
                                        </button>

                                        <button 
                                        onClick={() => setDeleteUser(user)}
                                        className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500">
                                            Delete
                                        </button>

                                        </div>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>

        </div>

        {deleteUser && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">

                    <h2 className="text-xl font-bold text-slate-900">Delete User</h2>

                    <p className="mt-3 text-slate-600">
                        "{deleteUser.name}" user will be permanently deleted
                    </p>

                    <div className="mt-6 flex justify-end gap-3">

                        <button
                        onClick={() => {setDeleteUser(null);}}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Cancel</button>

                        <button
                        onClick={() => handleDeleteUser(deleteUser._id)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>

                    </div>

                </div>

            </div>
        )}

        {roleUser && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">

                    <h2 className="text-xl font-bold text-slate-900">
                        Change Role
                    </h2>

                    <p className="mt-3 text-slate-600">
                        Change role for "{roleUser.name}"
                    </p>

                    <div className="mt-6 flex justify-end gap-3">

                        <button 
                        onClick={() => setRoleUser(null)}
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Cancel</button>

                        <button 
                        onClick={() => handleChangeRole(roleUser._id, roleUser.role === "user" ? "superadmin" : "user")}
                        className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">Change</button>

                    </div>

                </div>

            </div>
        )}

    </SuperadminLayout>
    );
}

export default SuperadminUsers;