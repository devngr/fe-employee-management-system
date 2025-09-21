import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../store/slices/tasksSlice";
import { fetchEmployees } from "../store/slices/employeesSlice";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.tasks);
  const { list: employees } = useSelector((state) => state.employees);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    deadline: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTask(form));
      setForm({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        deadline: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateTask({ id, data: { status } }));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    try {
      await dispatch(deleteTask(id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'status-badge bg-red-100 text-red-800';
      case 'medium': return 'status-badge bg-yellow-100 text-yellow-800';
      case 'low': return 'status-badge bg-green-100 text-green-800';
      default: return 'status-badge bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'in progress': return 'status-pending';
      case 'pending': return 'status-badge bg-gray-100 text-gray-800';
      default: return 'status-badge bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tasks Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'New Task'}
          </button>
        </div>

        {showForm && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter task title"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter task description"
                  rows="3"
                  className="textarea-field"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Assign To</label>
                  <select
                    value={form.assignedTo}
                    onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                    className="select-field"
                  >
                    <option value="">Unassigned</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="form-label">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="select-field"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="submit" className="btn-primary">
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {list.length === 0 ? (
              <div className="card text-center py-8">
                <p className="text-gray-500">No tasks found. Create your first task to get started.</p>
              </div>
            ) : (
              list.map((task) => (
                <div key={task._id} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <div className="flex gap-2">
                          <span className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </span>
                          <span className={`status-badge ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 mb-3">{task.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>
                          <strong>Assigned to:</strong> {task.assignedTo?.name || "Unassigned"}
                        </span>
                        {task.deadline && (
                          <span>
                            <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[200px]">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        className="select-field text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      
                      <button
                        className="btn-danger text-sm"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
