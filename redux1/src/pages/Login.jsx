import { useState } from "react";
import axiosInstace from "../config/axiosInstance";
import { Navigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [redirect, setRedirect] = useState(false);
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.password) {
      alert("Password is required");
      return;
    }

    try {
      const response = await axiosInstace.post("/api/auth/login", user);
      console.log(response.data);

      // Save token and update auth context
      login(response.data.token); // Call login() from context

      setUser({ email: "", password: "" });
      setRedirect(true); // Navigate to home
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[50%] bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Hello There! Welcome to Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-black mx-[30%] w-[30%] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
