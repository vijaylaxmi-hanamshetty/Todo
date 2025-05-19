"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Pencil, Trash2, X } from "lucide-react";

type Todo = {
  id: number;
  task: string;
  status: string;
};

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function fetchTodos() {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id");
      if (error) throw error;
      if (data) setTodos(data);
    } catch (error: any) {
      showToast(`Failed to fetch todos: ${error.message}`, "error");
    }
  }

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
  }

  async function addTodo() {
    if (!newTask.trim()) {
      showToast("Please enter a task description", "error");
      return;
    }
    try {
      const { error } = await supabase
        .from("todos")
        .insert([{ task: newTask, status: "Not Started" }]);
      if (error) throw error;
      setNewTask("");
      fetchTodos();
      showToast("Task added successfully");
    } catch (error: any) {
      showToast(`Failed to add task: ${error.message}`, "error");
    }
  }

  async function toggleStatus(id: number, currentStatus: string) {
    const nextStatus = currentStatus === "Done" ? "Not Started" : "Done";
    try {
      const { error } = await supabase
        .from("todos")
        .update({ status: nextStatus })
        .eq("id", id);
      if (error) throw error;
      fetchTodos();
      showToast(`Task marked as ${nextStatus}`);
    } catch (error: any) {
      showToast(`Failed to update status: ${error.message}`, "error");
    }
  }

  function startEditing(id: number, task: string) {
    setEditingId(id);
    setEditingTask(task);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTask("");
  }

  async function saveEdit(id: number) {
    if (!editingTask.trim()) {
      showToast("Task description cannot be empty", "error");
      return;
    }
    try {
      const { error } = await supabase
        .from("todos")
        .update({ task: editingTask })
        .eq("id", id);
      if (error) throw error;
      showToast("Task updated successfully");
      fetchTodos();
      cancelEditing();
    } catch (error: any) {
      showToast(`Failed to update task: ${error.message}`, "error");
    }
  }

  async function deleteTodo(id: number) {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) throw error;
      fetchTodos();
      showToast("Task deleted successfully");
    } catch (error: any) {
      showToast(`Failed to delete task: ${error.message}`, "error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold transition-opacity ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Todo Tasks
          </h1>

          
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-base sm:text-lg"
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-md transition text-base sm:text-lg"
              aria-label="Add Task"
            >
              Add Task
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No tasks yet. Add one to get started!
            </div>
          ) : (
            <ol className="space-y-3 list-decimal pl-6">
              {todos.map((todo, index) => (
                <li key={todo.id} className="pb-3 relative pl-2">
                  <div className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all">
                    <button
                      onClick={() => toggleStatus(todo.id, todo.status)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        todo.status === "Done"
                          ? "bg-green-100 border-green-500 text-green-500"
                          : "border-gray-300 text-transparent hover:border-green-500"
                      }`}
                      aria-label="Toggle status"
                      title={`Mark as ${
                        todo.status === "Done" ? "Not Started" : "Done"
                      }`}
                    >
                      {todo.status === "Done" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Editing Mode */}
                    {editingId === todo.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editingTask}
                          onChange={(e) => setEditingTask(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                          autoFocus
                          onKeyDown={(e) =>
                            e.key === "Enter" && saveEdit(todo.id)
                          }
                        />
                        {/* Save Button */}
                        <button
                          onClick={() => saveEdit(todo.id)}
                          className="h-9 px-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
                          aria-label="Save edit"
                          title="Save"
                        >
                          <Check size={16} />
                        </button>

                        <button
                          onClick={cancelEditing}
                          className="h-9 px-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition flex items-center justify-center"
                          aria-label="Cancel edit"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span
                          className={`${
                            todo.status === "Done"
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          } cursor-pointer select-none`}
                          onClick={() => toggleStatus(todo.id, todo.status)}
                          title="Toggle task status"
                        >
                          {todo.task}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => startEditing(todo.id, todo.task)}
                            className="h-8 w-8 p-0 border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md transition flex items-center justify-center"
                            aria-label="Edit task"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="h-8 w-8 p-0 border border-red-600 text-red-600 hover:bg-red-100 rounded-md transition flex items-center justify-center"
                            aria-label="Delete task"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}

          {todos.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 text-center select-none">
              {todos.filter((t) => t.status === "Done").length} of{" "}
              {todos.length} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
