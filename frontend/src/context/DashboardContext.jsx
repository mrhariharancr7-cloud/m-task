import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [lists, setLists] = useState(() => {
        try{
            const savedLists = localStorage.getItem("lists");
            return savedLists ? JSON.parse(savedLists) : [];
        } catch {
            return [];
        }
    });

    const  PUBLIC_ROUTES =["/", "/login", "/register", "/forgot-password", "/features", "/about", "/contact",]


const [loading, setLoading] = useState(true);

const [settings,setSettings] = useState(() => {
    try {
        const savedSettings = localStorage.getItem("userSettings");

        return savedSettings
        ? JSON.parse(savedSettings)
        : {
            startOfWeek: "Monday",
            showImportant: true,
            showCompleted: true,
        };
    } catch {
        return {
            startOfWeek: "Monday",
            showImportant: true,
            showCompleted: true,
        };
    }
});

const updateSettings = (updates) => {
    setSettings((previousSettings) => {
        const updatedSettings = {
            ...previousSettings,
            ...updates,
        };

        localStorage.setItem("userSettings", JSON.stringify(updatedSettings));
        return updatedSettings;
    });
};

const fetchCustomLists = async (token) => {
    const response = await fetch("http://localhost:5001/api/custom-lists", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch custom lists");
    }

    const data = await response.json();

    const customListNames = (data.customLists || []).map((list) => list.name);

    setLists(customListNames);
    localStorage.setItem("lists", JSON.stringify(customListNames));
};

//fetch user profile and all tasks data

useEffect(() => {
    const token = localStorage.getItem("token");

    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    if (!token) {
        if (!isPublicRoute) {
            navigate("/login", { replace: true });
        }

        setLoading(false);
        return;
    }

    const fetchDashboardData = async () => {
        try {
            const [profileResponse, tasksResponse] = await Promise.all([
                fetch("http://localhost:5001/api/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),

                fetch("http://localhost:5001/api/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            if (profileResponse.status === 401 || tasksResponse.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login", { replace: true });
                return;
            }

            if (!profileResponse.ok) {
                throw new Error("Failed to fetch user profile");
            }

            if (!tasksResponse.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const profileData = await profileResponse.json();
            const tasksData = await tasksResponse.json();

            setUser(profileData.user);
            setTasks(tasksData.tasks || []);
            await fetchCustomLists(token);

        } catch (error) {
            console.error("Dashboard loading error:", error);

        } finally {
            setLoading(false);
        }
    };
    fetchDashboardData();

}, [navigate, location.pathname]);

// calculate statistics

const totalTasks = tasks.length;

const completedTasks = tasks.filter((task) => task.completed).length;
const pendingTasks = tasks.filter((task) => !task.completed).length;
const importantTasks = tasks.filter((task) => task.important).length;

const overdueTasks = tasks.filter((task) => {
    if (task.completed || !task.dueDate) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate <= today;

}).length;

// check task is overdue

const isTaskOverdue = (task) => {
    if (task.completed || !task.dueDate) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate <= today;
};

// save custom list
const saveLists = (updatedLists) => {
    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
};

// create custom list
const handleCreateList = async (listName) => {
    const trimmedName = listName.trim();

    if (!trimmedName) {
        alert("Please enter the list name");
        return false;
    }

    const nameExists = lists.some(
        (list) => list.toLowerCase() === trimmedName.toLowerCase()
    );

    if (nameExists) {
        alert("A list with this name already exists");
        return false;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5001/api/custom-lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: trimmedName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to create custom list");
            return false;
        }

        setLists((previousLists) => {
            const updatedLists = [...previousLists, data.customList.name];
            localStorage.setItem("lists", JSON.stringify(updatedLists));
            return updatedLists;
        });

        return true;

    } catch (error) {
        console.error("Create custom list error:", error);
        alert("Unable to create custom list. Please try again.");
        return false;
    }
};

// rename lists
const handleRenameList = async (oldName, newName) => {
    const trimmedName = newName.trim();

    if (!trimmedName) {
        alert("Please enter the list name");
        return false;
    }

    const nameExists = lists.some(
        (list) =>
            list.toLowerCase() === trimmedName.toLowerCase() &&
            list !== oldName
    );

    if (nameExists) {
        alert("A list with this name already exists");
        return false;
    }

    const token = localStorage.getItem("token");

    try {
        const listResponse = await fetch("http://localhost:5001/api/custom-lists", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!listResponse.ok) {
            throw new Error("Failed to fetch custom lists");
        }

        const listData = await listResponse.json();

        const targetList = (listData.customLists || []).find(
            (list) => list.name === oldName
        );

        if (!targetList) {
            alert("Custom list not found");
            return false;
        }

        const response = await fetch(`http://localhost:5001/api/custom-lists/${targetList._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: trimmedName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to rename custom list");
            return false;
        }

        setLists((previousLists) => {
            const updatedLists = previousLists.map((list) => 
            list === oldName ? data.customList.name : list 
        );

        localStorage.setItem("lists", JSON.stringify(updatedLists));

        return updatedLists;
        });
        
        setTasks((previousTasks) =>
            previousTasks.map((task) =>
                task.list === oldName
                    ? { ...task, list: data.customList.name }
                    : task
        ));
        
        return true;
    } catch (error) {
        console.error("Rename custom list error:", error);
        alert("Unable to rename custom list. Please try again.");
        return false;
    }
};

// delete list
const handleDeleteList = async (listName) => {
    const token = localStorage.getItem("token");

    try {
        const listResponse = await fetch("http://localhost:5001/api/custom-lists", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!listResponse.ok) {
            throw new Error("Failed to fetch custom lists");
        }

        const listData = await listResponse.json();

        const targetList = (listData.customLists || []).find(
            (list) => list.name === listName
        );

        if (!targetList) {
            alert("Custom list not found");
            return false;
        }

        const response = await fetch(`http://localhost:5001/api/custom-lists/${targetList._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to delete custom list");
            return false;
        }

        setLists((previousLists) => {
            const updatedLists = previousLists.filter(
                (list) => list !== listName
            );

            localStorage.setItem("lists", JSON.stringify(updatedLists));

            return updatedLists;
        });

        setTasks((previousTasks) =>
            previousTasks.filter((task) => task.list !== listName));

        return true;
    } catch (error) {
        console.error("Delete custom list error:", error);
        alert("Unable to delete custom list. Please try again.");
        return false;
    }
};


// create new task

 const handleAddTask = async (taskData) => {
        const token = localStorage.getItem("token");

        if (!taskData.title.trim()) {
            alert("Please enter the task title");
            return;
        }

        // fecthing add task in m-task dashborad

        try {
            const response = await fetch("http://localhost:5001/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: taskData.title.trim(),
                    important: false,
                    completed: false,
                    list: taskData.list || "My-Task",
                    dueDate: taskData.dueDate || "",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const data = await response.json();

            setTasks((previousTasks) => [...previousTasks, data.task]);

            return data.task;
        } catch (error) {
            console.error("Create task error:", error);
            alert("Unable to create task. Please try again.");
        }
    
    };

// update task 

const handleUpdateTask = async (taskId, updates) => {
    const token = localStorage.getItem("token");
    const currentTask = tasks.find((task) => task._id === taskId);

    if (!currentTask) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: updates.title ?? currentTask.title,
                completed: updates.completed ?? currentTask.completed,
                important: updates.important ?? currentTask.important,
                list: updates.list ?? currentTask.list,
                dueDate: updates.dueDate ?? currentTask.dueDate ?? "",
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const data = await response.json();

        setTasks((previousTasks) =>
        previousTasks.map((task) =>
        task._id === taskId ? data.task : task));

        return data.task;
    } catch (error) {
        console.error("Update task error:", error);
        alert("Unable to update task. Please try again.");
    }
};

// important task
const handleImportantTask = async (task) => {
    return handleUpdateTask(task._id, {
        important: !task.important,
    });
};

//completed task
const handleCompleteTask = async (task) => {
    return handleUpdateTask(task._id, {
        completed: !task.completed,
    });
};

//delete task

const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        setTasks((previousTasks) => 
        previousTasks.filter((task) => task._id !== taskId));

        return true;
    } catch (error) {
        console.error("Delete task error:", error);
        alert("Unable to delete task. Please try again.");
        return false;
    }
};

// logout

const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
        await fetch("http://localhost:5001/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
    }
};

// data and funstions for user dashboard

const value = {user,tasks,setTasks,lists,setLists,saveLists,loading,totalTasks,completedTasks,pendingTasks,importantTasks,
    overdueTasks,isTaskOverdue,handleLogout, handleAddTask, handleUpdateTask, handleImportantTask, handleCompleteTask,
    handleDeleteTask, handleCreateList, handleRenameList, handleDeleteList, settings, updateSettings,
};

return (
    <DashboardContext.Provider value={value}>
        {children}
    </DashboardContext.Provider>
 );

}

export function useDashboard() {
    return useContext(DashboardContext);
}



