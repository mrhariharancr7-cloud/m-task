import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function usePaginatedTasks({ list, important, completed, limit = 10, refreshKey = 0,}) {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(() => {
    const savedPageSize = localStorage.getItem("taskPageSize");
    const parsedSize = Number(savedPageSize);
    return [10, 15, 20, 25].includes(parsedSize) ? parsedSize : limit;
    });

    const [pagination, setPagination] = useState({
        page: 1,
        limit: pageSize,
        totalTasks: 0,
        totalPages: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.setItem("taskPageSize", String(pageSize));
    },[pageSize])

    const listKey = list ?? "";
    const importantKey = important ?? "";
    const completedKey = completed ?? "";

    useEffect(() => {
        setPage(1);
    }, [listKey, importantKey, completedKey, pageSize])

    const fetchTasks = useCallback(async (signal) => {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(pageSize),
        });

        if (listKey) {
            params.set("list", listKey);
        }

        if (typeof important === "boolean") {
            params.set("important", String(important));
        }

        if (typeof completed === "boolean") {
            params.set("completed", String(completed));
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/tasks?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                signal,
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                navigate("/login", { replace: true });
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch tasks");
            }

            setTasks(data.tasks || []);
            setPagination(data.pagination);

            if (data.pagination && data.pagination.page !== page) {
                setPage(data.pagination.page);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Failed to fetch tasks");
            }
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, listKey, importantKey, completedKey, navigate, refreshKey,]);

    useEffect(() => {
        const controller = new AbortController();

        fetchTasks(controller.signal);
        return () => {
            controller.abort();
        };
    }, [fetchTasks, refreshKey]);

    return {
        tasks,
        pagination,
        page,
        setPage,
        loading,
        error,
        pageSize,
        setPageSize,
        refetch: () => fetchTasks(),
    };

}