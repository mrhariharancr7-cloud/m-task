import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuperadminLayout({ children }) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5001/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout =() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#f2fbfa]">

            {/*header*/}
            <header className="h-20 bg-white flex items-center justify-between px-10">

                <h1 className="text-3xl font-bold text-teal-700">M-Task</h1>

                <div className="flex items-center gap-8">

                <div className="text-right">
                    <p className="text-base font-bold text-slate-900">
                        {user?.name || "Superadmin"}
                    </p>

                    <p className="text-sm text-slate-500">
                        {user?.email || ""}
                    </p>

                </div>

                <button 
                onClick={handleLogout}
                className="bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700">Logout</button>

            </div>

            </header>

            {/*mainarea-SAdashboard*/}
            <div className="flex">

                {/*sidenavbar*/}
                <aside className="w-64 min-h-[calc(100vh-5rem)] bg-white px-8 py-10">

                    <h2 className="text-base font-medium text-slate-900 mb-8">
                        Superadmin
                    </h2>

                    <nav className="space-y-6">

                        <button 
                        onClick={() => navigate("/superadmin")}
                        className="block w-full text-left text-lg text-slate-900">Dashboard</button>

                        <button 
                        onClick={() => navigate("/superadmin/users")}
                        className="block w-full text-left text-lg text-slate-900">Users</button>

                        <button 
                        onClick={() => navigate("/superadmin/tasks")}
                        className="block w-full text-left text-lg text-slate-900">Tasks</button>

                        <button
                        onClick={() => navigate("/superadmin/settings")}
                        className="block w-full text-left text-lg text-slate-900">Settings</button>

                    </nav>

                </aside>

                {/*pagecontent*/}
                <main className="flex-1 bg-[#f2fbfa] p-10">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default SuperadminLayout;