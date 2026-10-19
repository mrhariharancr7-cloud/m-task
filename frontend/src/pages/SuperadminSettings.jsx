import { useEffect, useState } from "react";
import SuperadminLayout from "../components/SuperadminLayout";

function SuperadminSettings() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        const fetchProfile = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5001/api/profile",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUsername(data.user.name);
        setEmail(data.user.email);
    };

        fetchProfile();
    }, []);
    
    const handleSave = async () => {
        const token = localStorage.getItem("token");

        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                setMessage("Please fill all password fields");
                return;
            }
        }

        if (newPassword !== confirmPassword) {
            setMessage("Passwords not match")
            return;
        }

        const response = await fetch("http://localhost:5001/api/profile", {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: username,
                currentPassword: currentPassword,
                newPassword: newPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        setMessage(data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };


    return(
    <SuperadminLayout>

        <div>
            
            {/*settingpagecontent*/}
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">

                <h1 className="mb-2 text-3xl font-bold text-[#071A3D] sm:text-4xl">Settings</h1>

                {/*accountsection*/}
                <section className="mt-6 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8">
                    <h2 className="mb-6 text-2xl font-bold text-[#071A3D]">
                        Account
                    </h2>

                    {/*username*/}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Username
                        </label>

                        <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                         />
                    </div>

                    {/*email*/}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <input 
                        type="text"
                        value={email}
                        disabled
                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                         />
                    </div>

                    {/*changepassword*/}
                    <h3 className="mb-4 mt-8 text-lg font-medium text-slate-900">
                        Change password
                    </h3>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Current Password
                        </label>

                        <input 
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                         />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                           New Password 
                        </label>

                        <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                         />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>

                        <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                         />
                    </div>

                    <button 
                    onClick={handleSave}
                    className="rounded-lg bg-[#E78300] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#D97706]">
                    Save
                    </button>

                    {message && (
                        <p className="mt-4 text-sm text-[#071A3D]" role="status">
                            {message}
                        </p>
                    )}


                </section>

                {/*helpsection*/}
                <section className="border-b border-gray-200 py-8">
                    <h2 className="mb-4 text-2xl font-bold text-[#071A3D]">
                        Help & Feedback
                    </h2>

                    <p className="mb-4 text-slate-600">
                        Need help with M-Task
                    </p>

                    <div className="flex gap-6">
                        <button className="font-medium text-[#E78300] transition-colors hover:text-[#D97706] hover:underline">
                            Learn more 
                        </button>

                        <button className="font-medium text-[#E78300] transition-colors hover:text-[#D97706] hover:underline">
                            Send feedback
                        </button>
                    </div>
                </section>

                {/*aboutsection*/}
                <section className="py-8">
                    <h2 className="mb-4 text-2xl font-bold text-[#071A3D]">
                        About
                    </h2>

                    <p className="mt-1 text-slate-600">
                       M-Task - Task Management Application
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Version 2.0
                    </p>
                </section>

            </div>
        </div>

    </SuperadminLayout>
    );
}

export default SuperadminSettings;