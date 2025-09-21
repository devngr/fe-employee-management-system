import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeesReducer from './slices/employeesSlice';
import tasksReducer from './slices/tasksSlice';


const store = configureStore({
reducer: {
auth: authReducer,
employees: employeesReducer,
tasks: tasksReducer,
}
});


export default store;