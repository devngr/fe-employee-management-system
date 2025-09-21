import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';


export const fetchEmployees = createAsyncThunk('employees/fetch', async (q = '', thunkAPI) => {
try {
const res = await api.get(`/employees?q=${encodeURIComponent(q)}`);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});


export const createEmployee = createAsyncThunk('employees/create', async (payload, thunkAPI) => {
try {
const res = await api.post('/employees', payload);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});


export const updateEmployee = createAsyncThunk('employees/update', async ({ id, data }, thunkAPI) => {
try {
const res = await api.put(`/employees/${id}`, data);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});


export const deleteEmployee = createAsyncThunk('employees/delete', async (id, thunkAPI) => {
try {
await api.delete(`/employees/${id}`);
return id;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});


const employeesSlice = createSlice({
name: 'employees',
initialState: { list: [], loading: false, error: null },
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchEmployees.pending, (s) => { s.loading = true; s.error = null; })
.addCase(fetchEmployees.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
.addCase(fetchEmployees.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })


.addCase(createEmployee.fulfilled, (s, a) => { s.list.unshift(a.payload); })
.addCase(updateEmployee.fulfilled, (s, a) => { s.list = s.list.map(e => e._id === a.payload._id ? a.payload : e); })
.addCase(deleteEmployee.fulfilled, (s, a) => { s.list = s.list.filter(e => e._id !== a.payload); });
}
});


export default employeesSlice.reducer;