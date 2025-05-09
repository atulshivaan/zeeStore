import Product from "../models/products.model.js";


// Add a new product
export const addProduct = async (req, res) => {
    try {
      const { productName, productType, available, productDescription, price, category } = req.body;
  
      if (!productName || !productType || available === undefined || !productDescription || !price || !category) {
        return res.status(400).json({
          status: false,
          message: "All Fields are required",
        });
      }
  
      const newProduct = new Product({
        productName,
        productType,
        available,
        productDescription,
        price,
        category,
      });
  
      const savedProduct = await newProduct.save();
      return res.status(201).json({ message: "Product added successfully", product: savedProduct });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error adding product", error: error.message });
    }
  };

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
};

// Search products (by name, type, or category)
export const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: 'i' } },
        { productType: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};

// Edit product
export const editProduct = async (req, res) => {
  const { productName, productType, available, productImage, productDescription, price, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, productType, available, productImage, productDescription, price, category },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
