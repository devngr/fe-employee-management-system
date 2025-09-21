import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/dashboard");
        setData(res.data);
      } catch (err) {
        console.error('Dashboard loading error:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-64">
          <p className="text-gray-600">Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Total Employees
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {data?.totalEmployees ?? "-"}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Total Tasks
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {data?.totalTasks ?? "-"}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Pending Tasks
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {data?.pendingTasks ?? "-"}
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Completed Tasks
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {data?.completedTasks ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
