import React, { useState } from 'react';

export default function EmployeeForm({ initial = null, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    email: initial?.email || '',
    phone: initial?.phone || '',
    department: initial?.department || '',
    status: initial?.status || 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {initial ? 'Edit Employee' : 'Add New Employee'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter full name"
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="form-label">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="form-label">Department</label>
            <input
              type="text"
              value={form.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              placeholder="Enter department"
              className="input-field"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="form-label">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="select-field"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn-primary">
            {initial ? 'Update Employee' : 'Save Employee'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}