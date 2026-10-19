import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

    const navigate = useNavigate();
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


const [loading, setLoading] = useState(true);

//fetch user profile and all tasks data

useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login", { replace: true });
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
        } catch (error) {
            console.error("Dashboard loading error:", error);

        } finally {
            setLoading(false);
        }
    };
    fetchDashboardData();

}, [navigate]);

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

const handleCreateList = (listName) => {
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

    saveLists([...lists, trimmedName]);
    return true;
}

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

    const updatedLists = lists.map((list) =>
    list === oldName ? trimmedName : list);

    const affectedTasks = tasks.filter((task) => task.list === oldName);

    const updateResults = await Promise.all(
        affectedTasks.map((task) =>
            handleUpdateTask(task._id, { list: trimmedName })
        )
    );

    if (updateResults.some((result) => !result)) {
        alert("Some tasks could not be updated. Please try again.");
        return false;
    }

    saveLists(updatedLists);

    return true;
};

// delete list

const handleDeleteList = async (listName) => {
    const tasksToDelete = tasks.filter(
        (task) => task.list === listName);

    const deleteResults = await Promise.all(
        tasksToDelete.map((task) => handleDeleteTask(task._id))
    );

    if (deleteResults.some((result) => result !== true)) {
        alert("Some tasks could not be deleted. Please try again.");
        return false;
    }

    const updatedLists = lists.filter(
        (list) => list !== listName
    );

    saveLists(updatedLists);
    return true;

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
    handleDeleteTask, handleCreateList, handleRenameList, handleDeleteList,
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



