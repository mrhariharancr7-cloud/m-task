import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = tasks.filter((task) => !task.completed).length;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

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

     const  handleUpdateTask = () => {
            const token = localStorage.getItem("token");

            fetch(`http://localhost:5001/api/tasks/${editTaskId}`, {
                method: "PUT",
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
                    throw new Error("Failed to update task");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setTasks((prevTasks) =>
                prevTasks.map((item) =>
                 item._id === editTaskId ? data.task : item)
                );

                setTitle("");
                setEditTaskId(null);
            })
            .catch((error) => {
                console.log(error);
            });
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
        <div className="dashboard">

            {/*topnavbar*/}
            <header className="dashboard-header">
                <h2>M-Task</h2>

                <div className="user-section">
                    {user && (
                        <div>
                            <strong>{user.name}</strong>
                            <p>{user.email}</p>
                        </div>
                    )}

                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
            
            {/*dashboardbody*/}
            <div className="dashboard-body">
                
                {/*sidenavbar*/}
                <aside className="sidebar">
                    <p>My-Task</p>
                    <p>Important</p>
                    <p>Completed</p>

                    <hr />

                    <small>My Lists</small>

                    <p>+ New List</p>
                </aside>

                {/*userdashboard-content*/}
                <main className="dashboard-main">

                    <h1>My Tasks</h1>

                    <p>Stay organized with M-Task, get work things done.</p>

                    <div className="task-stats">

                        <div className="stat-card">
                            <span>Total</span>
                            <strong>{totalTasks}</strong>
                        </div>

                        <div className="stat-card">
                            <span>Pending</span>
                            <strong>{pendingTasks}</strong>
                        </div>

                        <div className="stat-card">
                            <span>Completed</span>
                            <strong>{completedTasks}</strong>
                        </div>

                    </div>
                    
                <div className="task-input">
                    <input 
                    type="text"
                    placeholder="Enter your task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <button onClick={editTaskId !== null ? handleUpdateTask : handleAddTask}>
                        {editTaskId !== null ? "Update Task" : "create Task"}
                    </button>
                </div>

                <div className="task-list">
                    {tasks.map((task) => (
                        <div className="task-row" key={task._id}>
                            
                            <div className="task-information">
                                <button
                                 className={`task-check ${task.completed ? "completed" : ""}`}
                                 onClick={() => handleCompleteTask(task)}
                                 >
                                    {task.completed ? "" : ""}
                                </button>

                                <div>
                                    <span className={task.completed ? "task-title completed-title" : "task-title"}>
                                        {task.title}
                                    </span>

                                    <span className={task.completed ? "status completed-status" : "status pending-status"}>
                                        {task.completed ? "Completed" : "Pending"}
                                    </span>
                                </div>
                            </div>

                            <div className="task-actions">
                                <button onClick={() => handleEditTask(task)}>
                                    Edit
                                </button>

                                <button onClick={() => handleDeleteTask(task)}>
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>


                </main> 

            </div>

        </div>
        
    );
 }

 export default Dashboard;