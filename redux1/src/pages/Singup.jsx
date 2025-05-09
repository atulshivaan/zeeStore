import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstace from '../config/axiosInstance';

const Singup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser, [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.password) {
      alert('Password is required');
      return;
    }

    try {
      const response = await axiosInstace.post('/api/auth/register', user);
      console.log(response.data);

      setUser({
        name: '',
        email: '',
        password: '',
      });

      navigate('/'); // 
    } catch (error) {
      console.error('Error signing up:', error.response ? error.response.data : error.message);
      alert('An error occurred while signing up. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[50%] bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Hello There! Welcome to Signup</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name</label>
            <input 
              type="text"
              name="name" 
              value={user.name}
              onChange={handleChange}
              className="border p-2 rounded-md" 
            />
          </div>
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

export default Singup;
