import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [activeTab, setActiveTab] = useState("My-Day");
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = tasks.filter((task) => !task.completed).length;
    const navigate = useNavigate();
    const [deleteTask, setDeleteTask] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showListInput, setShowListInput] = useState(false);
    const [listName, setListName] = useState("");
    const [showListModal, setShowListModal] = useState(false);
    
    


    const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("lists");
    return savedLists ? JSON.parse(savedLists) : [];
    });

    const [openListMenu, setOpenListMenu] = useState(null);
    const [deleteList, setDeleteList] = useState(null);
    const [renameList, setRenameList] = useState(null);
    const [renameListName, setRenameListName] = useState("");
    const [showRenameListModal, setShowRenameListModal] = useState(false);
    const [showListDeleteModal, setShowListDeleteModal] = useState(false);


    const filterdTasks = tasks.filter((task) => {
        if (activeTab === "completed") {
            return task.completed;
        }
        if (activeTab === "important") {
            return task.important;
        }
        if (activeTab === "My-Day") {
            return true;
        }
        return task.list === activeTab;
    });

    console.log("TASKS:", tasks);
    console.log("FILTERED:", filterdTasks);
    console.log("ACTIVE TAB:", activeTab);

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
                title: title,
                important: false,
                list: activeTab,
                dueDate: dueDate,
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

    const handleImportantTask = async (task) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5001/api/tasks/${task._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: task.title,
                    completed: task.completed,
                    important: !task.important,
                    list: task.list
                }),
            }
        );

        const data = await response.json();

        console.log("UPDATED TASK:", data.task);

        if (response.ok) {
            setTasks(
                tasks.map((item) =>
                    item._id === task._id ? data.task : item
            )
            ); 
        }
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
                completed: !task.completed,
                important: task.important,
                list: task.list
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
        setDeleteTask(task);
        setShowDeleteModal(true);
    };

    const confirmationDeleteTask = () => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:5001/api/tasks/${deleteTask._id}`, {
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
            prevTasks.filter((item) => item._id !== deleteTask._id)
        );

        setShowDeleteModal(false);
        setDeleteTask(null);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleEditTask = (task) => {
        setEditTaskId(task._id);
        setTitle(task.title);
        setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    };

     const  handleUpdateTask = () => {
        console.log("UPDATED clicked")
            const token = localStorage.getItem("token");
            const currentTask = tasks.find((task) => task._id === editTaskId);
    

            fetch(`http://localhost:5001/api/tasks/${editTaskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    dueDate: dueDate,
                    completed: currentTask.completed,
                    important: currentTask.important,
                    list: currentTask.list
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

        const handleCreateList = () => {
            if (!listName.trim()) {
                alert("Please enter the list name");
                return;
            }

            const nameExists = lists.some(
                (list) => list.toLowerCase() === listName.trim().toLowerCase()
            );

            if (nameExists) {
                alert("list with this name already exists");
                return;
                
            }

            const updatedLists = [...lists, listName];

            setLists(updatedLists);
            localStorage.setItem("lists" , JSON.stringify(updatedLists));

            setListName("");
            setShowListModal(false);
        };

        const handleRenameList = () => {
            if (!renameListName.trim()) {
                alert("please enter the list name");
                return;
            }

            const nameExists = lists.some(
                (list) =>
                    list.toLowerCase() === renameListName.trim().toLowerCase() &&
                list !== renameList
            );

            if (nameExists) {
                alert("The list with this name already exists");
                return;
            }

            const updatedLists = lists.map((list) =>
            list === renameList ? renameListName.trim() : list
        );
        
        setLists(updatedLists);
        localStorage.setItem("lists", JSON.stringify(updatedLists));

        if (activeTab === renameList) {
            setActiveTab(renameListName.trim());
        }

        setRenameList(null);
        setRenameListName("");
        setShowRenameListModal(false);
        }

        const handleDeleteList = () => {
            if (!deleteList) return;

            const updatedLists = lists.filter((list) => list !== deleteList);

            setLists(updatedLists);
            localStorage.setItem("lists", JSON.stringify(updatedLists));

            if (activeTab === deleteList) {
                setActiveTab("My-Day");
            }

            setDeleteList(null);
            setShowListDeleteModal(false);
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
        
        let url;

        if (activeTab === "My-Day") {
            url = "http://localhost:5001/api/tasks";
        } else if (activeTab === "important") {
            url = "http://localhost:5001/api/tasks?important=true";
        } else if (activeTab === "completed") {
            url = "http://localhost:5001/api/tasks?completed=true";
        } else {
            url = `http://localhost:5001/api/tasks?list=${encodeURIComponent(activeTab)}`;
        }

        console.log("Active tab:", activeTab);
        console.log("URL:", url);


        fetch(url, {
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
       

    }, [navigate, activeTab]);

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
                    <p onClick={() => setActiveTab("My-Day")}>
                        My Task
                    </p>

                    {user?.showImportant && (
                            <p onClick={() => setActiveTab("important")}>
                                Important
                            </p>
                    )}

                    {user?.showCompleted && (
                        <p onClick={() => setActiveTab("completed")}>
                            Completed
                        </p>
                    )}

                    <hr />

                    <small>My Lists</small>

                    
                        <p onClick={() => setShowListModal(true)}>+ New List</p>
                    

                    {lists.map((list, index) => (
                        <div className="custom-list-item" key={index}>
                            <p onClick={() => setActiveTab(list)}>
                                {list}
                            </p>

                            <div className="custom-list-menu-container">
                                <button className="custom-list-menu-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenListMenu(
                                        openListMenu === list ? null : list
                                    );
                                }}>...</button>

                                {openListMenu === list && (
                                    <div className="custom-list-menu">
                                        
                                        <button
                                        onClick={() => {
                                            setRenameList(list);
                                            setRenameListName(list);
                                            setShowRenameListModal(true);
                                            setOpenListMenu(null);
                                        }}>Rename</button>

                                        <button
                                        onClick={() => {
                                            setDeleteList(list);
                                            setShowListDeleteModal(true);
                                            setOpenListMenu(null);
                                        }}>Delete</button>
                                    </div>
                                )}
                            </div>


                        </div>
                        
                    ))}

                     <Link 
                          to="/settings"
                          className="block ml-9 mt-3 text-lg font-medium text-teal-700 no-underline hover:text-teal-900">Settings</Link>

                    {showListModal && (
                        <div className="customlist-overlay">
                         <div className="modal">
                            <h2>Create New List</h2>
                            <input 
                            type="text"
                            placeholder="Enter list name"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                             />
                            
                            <div className="customlist-button-actions">
                                <button onClick={handleCreateList}>
                                    create
                                </button>

                                <button onClick={() => setShowListModal(false)}>
                                    cancel
                                </button>
                            </div>
                            
                        </div>   
                        </div>
                    )}

                    {showListDeleteModal && (
                        <div className="list-delete-modal-overlay">
                            <div className="list-delete-modal">
                                <h2>Delete List?</h2>

                                <p>Are you want to delete "{deleteList}"</p>

                                <div className="list-delete-modal-actions">
                                    <button
                                    className="list-delete-cancel-button"
                                    onClick={() => {
                                        setShowListDeleteModal(false);
                                        setDeleteList(null);
                                    }}
                                    >Cancel</button>

                                    <button
                                    className="list-delete-confirm-button"
                                    onClick={handleDeleteList}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showRenameListModal && (
                        <div className="list-rename-model-overlay">
                            <div className="list-rename-modal">
                                <h2>Rename List</h2>
                                <input 
                                type="text"
                                value={renameListName}
                                onChange={(e) => setRenameListName(e.target.value)}
                                 />
                                
                                <div className="list-rename-modal-actions">
                                    <button
                                    onClick={() => {
                                        setShowRenameListModal(false);
                                        setRenameList(null);
                                    }}>cancel</button>

                                    <button onClick={handleRenameList}>Rename</button>
                                </div>
                            </div>
                        </div>
                    )}



                </aside>

                {/*userdashboard-content*/}
                <main className="dashboard-main">

                    <h1>My Tasks</h1>

                    <p>Stay organized with M-Task, get work things done</p>

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

                    <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)} 
                    />

                    <button onClick={editTaskId !== null ? handleUpdateTask : handleAddTask}>
                        {editTaskId !== null ? "Update Task" : "create Task"}
                    </button>
                </div>

                <div className="task-list">
                    {filterdTasks.map((task) => (
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

                                    {task.dueDate && (
                                        <span className="due-date">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}

                                    {["My-Day", "important", "completed"].includes(activeTab) && (
                                        <span className="task-list-name">
                                          {task.list}
                                        </span>
                                    )}

                                </div>
                            </div>

                            <div className="task-actions">
                                <button onClick={() => handleEditTask(task)}>
                                    Edit
                                </button>

                                <button className={`important-button ${task.important ? "active" : ""}`} onClick={() => handleImportantTask(task)}>
                                    {task.important ? "Important" : "Mark Important"}
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

            {showDeleteModal && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">

                        <h2>Delete Task</h2>

                        <p>
                            "{deleteTask?.title}" will be permanently deleted.
                        </p>

                        <div className="delete-modal-actions">
                            <button className="delete-confirm-button" onClick={confirmationDeleteTask}>
                                Delete
                            </button>

                            <button className="delete-cancel-button" onClick={() => {
                                setShowDeleteModal(false);
                                setDeleteTask(null);
                            }}>Cancel</button>

                        </div>
                    </div>
                </div>
            )}


        </div>
        
    );
 }

 export default Dashboard;