import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../config/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productType: "",
    available: false,
    productDescription: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      available: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstace.post("/api/product/add", product);
      if (response.status === 201) {
        toast.success("Product added successfully!");
        navigate("/product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-white">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Add New Product</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-black">Product Name</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              className="border border-black p-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-black">Product Type</label>
            <input
              type="text"
              name="productType"
              value={product.productType}
              onChange={handleChange}
              className="border border-black p-2 rounded-md"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={handleCheckboxChange}
              className="w-5 h-5"
            />
            <label className="font-medium text-black">Available</label>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-black">Product Description</label>
            <textarea
              name="productDescription"
              value={product.productDescription}
              onChange={handleChange}
              className="border border-black p-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-black">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border border-black p-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-black">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border border-black p-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black w-1/3 text-white py-2 px-4 rounded-md hover:bg-pink-500 transition duration-300 mx-auto"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
