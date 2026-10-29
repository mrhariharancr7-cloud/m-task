import Task from "../models/Task.js";


// create task
export const createTask = async (req, res) => {
    const { title, important, list, dueDate } = req.body;

    const task = new Task({
        title,
        important: important || false,
        list,
        dueDate,
        user: req.user.userId
    });

    await task.save();

    res.status(201).json({
        message: "Task created Successfully",
        task
    });
};

// get tasks data
export const getTasks = async (req, res) => {
    try {
        const { list, important, completed, page, limit } = req.query;

        const filter = { user: req.user.userId};

        if (typeof list === "string" && list.trim() !== "") {
            filter.list = list;
        }

        if (important === "true") {
            filter.important = true;
        } else if (important === "false") {
            filter.important = false;
        }

        if (completed === "true") {
            filter.completed = true;
        } else if (completed === "false") {
            filter.completed = false;
        }

        if (page === undefined && limit === undefined) {
            const tasks = await Task.find(filter).sort({ _id: 1});

            return res.status(200).json({ tasks });
        }

        const parsedpage = Number.parseInt(page, 10);
        const parsedlimit = Number.parseInt(limit, 10);

        const allowedPageSizes = [10, 15, 20, 25];

        const pageSize = allowedPageSizes.includes(parsedlimit)
            ? parsedlimit
            : 10;

        let currentPage = 
        Number.isFinite(parsedpage) && parsedpage > 0
        ? parsedpage : 1;

        const totalTasks = await Task.countDocuments(filter);

        const totalPages = Math.ceil(totalTasks / pageSize);

        currentPage = 
            totalPages === 0 
                ? 1 : Math.min(currentPage, totalPages);
        
        const skip = (currentPage - 1) * pageSize;

        const tasks = await Task.find(filter)
        .sort({ _id: 1 })
        .skip(skip)
        .limit(pageSize);

        return res.status(200).json({
            tasks,
            pagination: { page: currentPage, limit: pageSize, totalTasks, totalPages}
        });

    } catch (error) {
        console.error("Error fetching tasks:", error);

        return res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }

};

//update task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed, important, list, dueDate} = req.body;

    const task = await Task.findOneAndUpdate(
        {
            _id: id,
            user: req.user.userId
        },
        {
            title, completed , important, list, dueDate,
        },
        {new: true}
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task Updated Successfully",
        task
    });
};

//delete task
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
        _id: id,
        user: req.user.userId
    });

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({
        message: "Task deleted successfully"
    });
};