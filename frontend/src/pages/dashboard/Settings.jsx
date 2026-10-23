import { useEffect, useState } from "react";
import { useDashboard } from "../../context/DashboardContext";

function Settings() {
    const { settings, updateSettings } = useDashboard();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [editUser, setEditUser] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [weekMessage, setWeekMessage] = useState("");
    const [smartListMessage, setSmartListMessage] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    
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
        setOriginalUsername(data.user.name);
        setEmail(data.user.email);
        
    };

        fetchProfile();
    }, []);

    const handleUpdateUser = async () => {
        const token = localStorage.getItem("token");

        if (!username.trim()) {
            setUserMessage("Username cannot be empty");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: username.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setUserMessage(data.message || "Failed to update username");
                return;
            }

            setUsername(data.user?.name || username.trim());
            setOriginalUsername(data.user?.name || username.trim());
            setUserMessage("Username updated successfully");
            setEditUser(false);

        } catch (error) {
            console.error("Username update error:", error);
            setUserMessage("Unable to update username. Please try again.");
        }
    };
    
    const handleSave = async () => {
        const token = localStorage.getItem("token");

        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                setMessage("Please fill all password fields");
                return;
            }
        }

        if (newPassword !== confirmPassword) {
            setMessage("new and confirm password not match.")
            return;
        }

        if (currentPassword === newPassword) {
            setMessage("New password must different from current password.")
            return;
        }

        const response = await fetch("http://localhost:5001/api/profile", {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
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

    const handleSmartListChange = async (type, value) => {
        setSmartListMessage("");
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5001/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    [type]: value,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setSmartListMessage(data.message || "Failed to update smart list");
                return;
            }

            updateSettings({ [type]: value });
            setSmartListMessage("Smart list updated successfully");

        } catch (error) {
            console.error("Smart list update error:", error);
            setSmartListMessage("Unable to update smart list");
        }
    };

    const handleStartOfWeekChange = async (value) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5001/api/profile", {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    startOfWeek: value,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Failed to update start of week");
                return;
            }

            updateSettings({ startOfWeek: value });
            setWeekMessage("Start of the week updated successfully");

        } catch (error) {
            console.error("Update start of week error:", error);
            setWeekMessage("Unable to update start of the week");
        }
    };


    return(
        <div className="min-h-screen bg-white">
            
            <div className="mb-2">

                <h1 className="text-4xl font-bold">Settings</h1>

                <p className="mt-1 text-orange-400">Manage your account settings</p>

            </div>
        
            {/*settingpagecontent*/}
            <div className="w-full px-4 pt-2 pb-8 sm:px-6 lg:px-8">

                {/*accoountinfosection*/}
                <section className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-semibold text-slate-900">Account Information</h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-500">Username</label>

                            <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!editUser}
                            className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100 ${
                                editUser
                                ? "border-gray-300 bg-white"
                                : "border-gray-200 bg-gray-50 text-slate-700"}`} />

                            <div className="mt-4 flex flex-wrap gap-2">
                                {!editUser ? (
                                    <button
                                    type="button"
                                    onClick={() => {
                                        setUserMessage("");
                                        setEditUser(true); }}
                                    className="rounded-lg bg-[#E78300] px-4 py-2 font-semibold text-white transition hover:bg-[#C96F00]">Edit</button>
                                ) : (
                                    <div className="flex flex-wrap gap-3">

                                        <button 
                                        type="button"
                                        onClick={handleUpdateUser}
                                        className="rounded-lg bg-[#E78300] px-4 py-2 font-semibold text-white transition hover:bg-[#C96F00]">Save</button>

                                        <button 
                                        type="button"
                                        onClick={() => {
                                            setEditUser(false);
                                            setUsername(originalUsername);
                                            setUserMessage(""); }}
                                        className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-gray-100">Cancel</button>
                                    </div>
                                )}
                            </div>

                            {userMessage && (
                                <p className="mt-3 text-sm font-medium text-[#E78300]" 
                                role="status">
                                    {userMessage}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-500">Email</label>

                            <input 
                            type="email"
                            value={email}
                            disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-slate-500" />

                        </div>
                    </div>
                    
                </section>

                {/*changepasswordsection*/}
                <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-semibold text-slate-900">Change Password</h2>

                    <div className="max-w-md">
                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Current Password</label>

                            <input 
                            type="password"
                            autoComplete="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">New Password</label>

                            <input 
                            type="password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm New Password</label>

                            <input 
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#E78300] focus:ring-2 focus:ring-orange-100" />
                        </div>

                        <button 
                        type="button"
                        onClick={handleSave}
                        className="rounded-lg bg-[#E78300] px-4 py-2 font-semibold text-white transition hover:bg-[#C96F00]">Update Password</button>

                        {message && (
                            <p className="mt-4 text-sm font-medium text-[#E78300]" role="status">{message}</p>
                        )}
                    </div>

                </section>

                {/*generalsection*/}
                <section className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-semibold text-slate-900">General</h2>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-500">Start of the week</label>

                        <select 
                        value={settings.startOfWeek}
                        onChange={(e) => handleStartOfWeekChange(e.target.value)}
                        className="w-full max-w-xs rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#E78300] focus:ring-2 focus:ring-orange-100"
                        >
                            <option>Monday</option>
                            <option>Sunday</option>
                        </select>

                        {weekMessage && (
                            <p className="mt-3 text-sm font-medium text-[#E78300]" role="status">
                                {weekMessage}
                            </p>
                        )}
                    </div>

                </section>

                {/*smartlistsection*/}
                <section className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-semibold text-slate-900">Smart Lists</h2>

                    <div className="flex items-center justify-between border-b border-gray-100 py-4">
                        <div>
                            <p className="font-medium text-slate-800">Important</p>
                        </div>

                        <button 
                        type="button"
                        role="switch"
                        aria-checked={settings.showImportant}
                        aria-label="Show Important tasks"
                        onClick={() => 
                            handleSmartListChange("showImportant", !settings.showImportant)
                        }
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-orange-300  ${
                                settings.showImportant ? "bg-[#E78300]" : "bg-gray-300"}`}
                                >
                                <span 
                                className={`pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                                    settings.showImportant ? "translate-x-5" : "translate-x-0"}`}/>
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="font-medium text-slate-800">completed</p>
                        </div>

                        <button 
                        type="button"
                        role="switch"
                        aria-checked={settings.showCompleted}
                        aria-label="Show completed tasks"
                        onClick={() => 
                            handleSmartListChange("showCompleted", !settings.showCompleted)
                        }
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 
                            focus:outline-none focus:ring-2 focus:ring-orange-300  ${
                                settings.showCompleted ? "bg-[#E78300]" : "bg-gray-300"}`}
                                >
                                <span 
                                className={`pointer-events-none absolute left-0.5 h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                                    settings.showCompleted ? "translate-x-5" : "translate-x-0"}`}/>
                        </button>
                    </div>

                    {smartListMessage && (
                        <p className="mt-3 text-sm font-medium text-[#E78300]" role="status">
                            {smartListMessage}
                        </p>
                    )}
                    
                </section>

                {/*helpsection*/}
                <section className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-semibold text-slate-900">
                        Help & Feedback
                    </h2>

                    <p className="mb-6 text-sm leading-6 text-slate-600">
                        Need help with M-Task
                    </p>

                    <div className="flex gap-6">
                        <button className="text-orange-400 hover:underline">
                            Learn more 
                        </button>

                        <button className="text-orange-400 hover:underline">
                            Send feedback
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default Settings;