import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("login");
            return;
        }

        fetch("http://localhost:5001/api/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(unauthorized);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setUser(data.user);
        })

        .catch((error) => {
            console.log(error);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login");
        });

    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>

            {user && (
                <div>
                    <h2>Welcome to M-Task</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            )}
        </div>
    );
 }

 export default Dashboard;