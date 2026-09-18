import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [weekMessage, setWeekMessage] = useState("");
    const [startOfWeek, setStartOfWeek] = useState("Monday");
    const [showImportant, setShowImportant] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);

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
        setStartOfWeek(data.user.startOfWeek);
        setShowImportant(data.user.showImportant);
        setShowCompleted(data.user.showCompleted);
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

    const handleSmartListChange = async (type, value) => {
        const token = localStorage.getItem("token");

        if (type === "showImportant") {
            setShowImportant(value);
        }

        if (type === "showCompleted") {
            setShowCompleted(value);
        }

        const response = await fetch("http://localhost:5001/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                [type]: value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            
            if (type === "showImportant") {
                setShowImportant(!value);
            }

            if (type === "showCompleted") {
                setShowCompleted(!value);
            }

            return;
        }

        setMessage("Smart list updated successfully");
    };

    const handleStartOfWeekChange = async (value) => {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5001/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                startOfWeek: value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        setStartOfWeek(value);
        setWeekMessage("start of the week updated")
    };


    return(
        <div className="min-h-screen bg-white">
            {/*settingsHeader*/}
            <div className="border-b border-gray-200 px-8 py-5">
                <div className="flex items-center gap-4">

                    <button
                    onClick={() => navigate("/dashboard")}
                    className="text-base font-medium text-slate-700 hover:text-teal-700">Back</button>

                    <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
                </div>
            </div>

            {/*settingpagecontent*/}
            <div className="mx-auto max-w-2xl px-6 py-10">

                {/*accountsection*/}
                <section className="border-b border-gray-200 pb-8">
                    <h2 className="mb-6 text-2xl font-semibold text-slate-900">
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                         />
                    </div>

                    <button 
                    onClick={handleSave}
                    className="rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800">
                    Save
                    </button>

                    {message && (
                        <p className="mt-4 text-sm text-teal-700">
                            {message}
                        </p>
                    )}


                </section>

                {/*generalsection*/}
                <section className="border-b border-gray-200 py-8">
                    <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                        General
                    </h2>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Start of the week
                        </label>

                        <select 
                        value={startOfWeek}
                        onChange={(e) => handleStartOfWeekChange(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600">
                            <option>Monday</option>
                            <option>Sunday</option>
                        </select>

                        {weekMessage && (
                            <p className="mt-2 text-sm text-teal-700">
                                {weekMessage}
                            </p>
                        )}
                    </div>

                </section>

                {/*smartlistsection*/}
                <section className="border-b border-gray-200 py-8">
                    <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                        Smart Lists
                    </h2>

                    <div className="flex items-center justify-between py-3">
                        <span className="text-slate-800">
                            Important
                        </span>

                        <button 
                        onClick={() => handleSmartListChange("showImportant", !showImportant)}
                        className={`h-6 w-11 rounded-full ${showImportant ? "bg-teal-600" : "bg-gray-300"}`}>
                            <span 
                            className={`block h-5 w-5 rounded-full bg-white shadow ${showImportant ? "ml-5" : "ml-1" }`}/>
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <span className="text-slate-800">
                            Completed
                        </span>

                        <button 
                        onClick={() => handleSmartListChange("showCompleted", !showCompleted)}
                        className={`h-6 w-11 rounded-full ${showCompleted ? "bg-teal-600" : "bg-gray-300"}`}>
                            <span className={`block h-5 w-5 rounded-full bg-white shadow ${showCompleted ? "ml-5" : "ml-1"}`}/>
                        </button>
                    </div>
                </section>

                {/*helpsection*/}
                <section className="border-b border-gray-200 py-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                        Help & Feedback
                    </h2>

                    <p className="mb-4 text-slate-600">
                        Need help with M-Task
                    </p>

                    <div className="flex gap-6">
                        <button className="text-teal-700 hover:underline">
                            Learn more 
                        </button>

                        <button className="text-teal-700 hover:underline">
                            Send feedback
                        </button>
                    </div>
                </section>

                {/*aboutsection*/}
                <section className="py-8">
                    <h2 className="mb-4 text-2xl font-semibold text-slate-900">
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
    );
}

export default Settings;