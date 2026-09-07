import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Dashboard() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const navigate = useNavigate();

    const handleAddTask = () => {
        const token = localStorage.getItem("token");

        if (!title.trim()) {
            alert("Please enter the task title");
            return;
        }

        // fecthing add task in m-task dashborad
        fetch("http://localhost:5001/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to create task");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setTasks((prevTasks) => [...prevTasks, data.task]);
            setTitle("");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleCompleteTask = (task) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:5001/api/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title:task.title,
                completed: !task.completed
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Faild to update task");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);

            setTasks((prevTasks) =>
                prevTasks.map((item) =>
                item._id === task._id ? data.task : item)
            );
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleDeleteTask = (task) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:5001/api/tasks/${task._id}`, {
             method: "DELETE",
             headers: {
                Authorization: `Bearer ${token}`
             }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to delete task");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setTasks((prevTasks) =>
             prevTasks.filter((item) => item._id !== task._id));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleEditTask = (task) => {
        setEditTaskId(task._id);
        setTitle(task.title);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        //fecthing user profile
        fetch("http://localhost:5001/api/profile", {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        
        .then((res) => {
            if (!res.ok) {
                throw new Error("unauthorized");
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

        // fetch tasks in dashboard

        fetch("http://localhost:5001/api/tasks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch tasks");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setTasks(data.tasks);
        })
        .catch((error) => {
            console.log(error);
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

            <input
            type="text"
            placeholder="Enter your task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={handleAddTask}>Add Task</button>

            <h2>Your tasks</h2>

            {tasks.map((task) => (
                <div key= {task._id}>
                    <h3>{task.title}</h3>

                    <p>
                        status: {task.completed ? "Completed" : "Pending"}
                    </p>

                    <button onClick={() => handleEditTask(task)}>
                        Edit
                    </button>

                    <button onClick={() => handleCompleteTask(task)}>
                        {task.completed ? "pending": "Complete"}
                    </button>

                    <button onClick={() => handleDeleteTask(task)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
 }

 export default Dashboard;