import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstace from "../config/axiosInstance";
import { IoCart } from "react-icons/io5";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstace.get("/api/product/all");
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = product.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-6 shadow-md p-4 rounded-xl bg-black text-white">
        {/* Add Product Button */}
        <Link to="/add-Product">
          <button className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-pink-500 hover:text-white transition duration-300">
            Add Product
          </button>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-400 rounded-lg bg-white p-2">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none p-2 w-64 bg-white text-black"
          />
          <FaSearch className="text-black ml-2" size={20} />
        </div>
      </div>

      {/* Product List */}
      <div className="w-full">
        {filteredProducts.length === 0 ? (
          <p className="text-black text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="border border-black bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-black">{product.productName}</h2>
                  <button className="text-black hover:text-pink-500">
                    <IoCart size={24} />
                  </button>
                </div>
                <p className="text-gray-700">Type: {product.productType}</p>
                <p className="text-gray-700">Available: {product.available ? "Yes" : "No"}</p>
                <p className="text-gray-700">Price: ₹{product.price}</p>
                <p className="text-gray-700 mb-4">Category: {product.category}</p>

                <div className="flex justify-between">
                  <button className="px-4 py-1 bg-black text-white rounded hover:bg-pink-500 transition">
                    Edit
                  </button>
                  <button className="px-4 py-1 bg-black text-white rounded hover:bg-pink-500 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
