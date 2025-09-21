import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance';


export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
try {
const res = await api.get('/tasks');
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});


export const createTask = createAsyncThunk('tasks/create', async (payload, thunkAPI) => {
try {
const res = await api.post('/tasks', payload);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, thunkAPI) => {
try {
const res = await api.patch(`/tasks/${id}/status`, data);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});


export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
try {
await api.delete(`/tasks/${id}`);
return id;
} catch (err) {
return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
}
});

const tasksSlice = createSlice({
name: 'tasks',
initialState: { list: [], loading: false, error: null },
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchTasks.pending, (s) => { s.loading = true; s.error = null; })
.addCase(fetchTasks.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
.addCase(fetchTasks.rejected, (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })


.addCase(createTask.fulfilled, (s, a) => { s.list.unshift(a.payload); })
.addCase(updateTask.fulfilled, (s, a) => { s.list = s.list.map(t => t._id === a.payload._id ? a.payload : t); })
.addCase(deleteTask.fulfilled, (s, a) => { s.list = s.list.filter(t => t._id !== a.payload); });
}
});


export default tasksSlice.reducer;