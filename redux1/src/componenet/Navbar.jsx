import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../config/AuthContext";
import { FaAppStore } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-white shadow-md rounded-2xl m-4 text-black">
      {/* Brand */}
      <div className="flex items-center gap-2 font-bold text-2xl">
        <FaAppStore className="text-pink-500" />
        <Link to="/" className="hover:text-pink-500 transition duration-200">
          zeeStore
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-lg font-medium">
        <Link to="/" className="hover:text-pink-500 transition">Home</Link>
        <Link to="/product" className="hover:text-pink-500 transition">Products</Link>
        <Link to="/order" className="hover:text-pink-500 transition">Order</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-black hover:text-pink-500 transition">
            <FiLogOut size={26} />
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-1 border border-black text-black hover:bg-pink-500 hover:text-white rounded-lg transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-1 border border-black text-black hover:bg-pink-500 hover:text-white rounded-lg transition">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
