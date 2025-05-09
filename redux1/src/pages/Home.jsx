import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-10 rounded-3xl shadow-xl bg-black max-w-xl space-y-6">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome to <span className="text-pink-400">zeeStore</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Discover top-quality products curated just for you — variety, value, and excellence in every click.
        </p>
        <Link to="/product">
          <button className="flex items-center justify-center gap-2 bg-white text-black hover:bg-pink-500 hover:text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-300 w-full max-w-sm mx-auto">
            <IoIosAdd size={22} />
            Add Products to Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
