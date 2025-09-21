import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../store/slices/employeesSlice";
import EmployeeForm from "../components/EmployeeForm";
import Navbar from "../components/Navbar";

export default function Employees() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employees);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchEmployees(searchQuery));
  };

  const handleCreate = async (data) => {
    try {
      await dispatch(createEmployee(data));
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await dispatch(updateEmployee({ id, data }));
      setEditingEmployee(null);
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    
    try {
      await dispatch(deleteEmployee(id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1">
            <input
              type="text"
              className="input-field"
              placeholder="Search by name, email, or department"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn-secondary">
              Search
            </button>
          </form>
          
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(true);
              setEditingEmployee(null);
            }}
          >
            Add Employee
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <EmployeeForm 
              onSave={handleCreate} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600">Loading employees...</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((employee) => (
                  <tr key={employee._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`status-badge ${
                        employee.status === 'Active' ? 'status-active' : 'status-inactive'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        onClick={() => setEditingEmployee(employee)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingEmployee && (
          <div className="mt-6">
            <EmployeeForm
              initial={editingEmployee}
              onSave={(data) => handleUpdate(editingEmployee._id, data)}
              onCancel={() => setEditingEmployee(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
