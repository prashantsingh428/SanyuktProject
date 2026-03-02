import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        oldPrice: "",
        bv: "",
        stock: "",
        description: "",
        rating: "",
        numReviews: "",
    });

    const [image, setImage] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            oldPrice: "",
            bv: "",
            stock: "",
            description: "",
            rating: "",
            numReviews: "",
        });
        setImage(null);
        setImagePreview(null);
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (image) {
            data.append("image", image);
        }

        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Product updated successfully!");
            } else {
                await api.post("/products", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Product added successfully!");
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || "Error saving product");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setFormData({
            name: product.name || "",
            price: product.price || "",
            oldPrice: product.oldPrice || "",
            bv: product.bv || "",
            stock: product.stock || "",
            description: product.description || "",
            rating: product.rating || "",
            numReviews: product.numReviews || "",
        });
        if (product.image) {
            setImagePreview(`http://localhost:5000/uploads/${product.image}`);
        }
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setLoading(true);
            try {
                await api.delete(`/products/${id}`);
                alert("Product deleted successfully!");
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error deleting product");
            } finally {
                setLoading(false);
            }
        }
    };

    // रेटिंग स्टार्स दिखाने के लिए फंक्शन
    const renderRatingStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2;

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else if (i - 0.5 === roundedRating) {
                stars.push(<span key={i} className="text-yellow-400">½</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-500 hover:shadow-xl border border-green-100 animate-slide-down">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-5xl text-green-600">📦</span>
                        <span className="bg-gradient-to-r from-green-600 to-green-800 text-transparent bg-clip-text">
                            Product Management
                        </span>
                    </h1>
                    <button
                        className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transform transition-all duration-300 hover:scale-105 shadow-md ${showForm
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                        onClick={() => setShowForm(!showForm)}
                    >
                        <span className="text-xl">{showForm ? '✕' : '+'}</span>
                        {showForm ? 'Close Form' : 'Add New Product'}
                    </button>
                </div>
            </div>

            {/* Form Section with Animation */}
            <div className={`transition-all duration-500 overflow-hidden mb-8 ${showForm ? 'max-h-[2500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        {editingId ? (
                            <>
                                <span className="text-2xl">✏️</span>
                                <span className="text-green-700">Edit Product</span>
                            </>
                        ) : (
                            <>
                                <span className="text-2xl">➕</span>
                                <span className="text-green-700">Add New Product</span>
                            </>
                        )}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Product Name <span className="text-green-600">*</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                            </div>

                            {/* Price Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Price (₹) <span className="text-green-600">*</span>
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                            </div>

                            {/* Old Price Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Old Price (₹)
                                </label>
                                <input
                                    name="oldPrice"
                                    type="number"
                                    placeholder="Enter old price"
                                    value={formData.oldPrice}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                            </div>

                            {/* BV Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    BV <span className="text-green-600">*</span>
                                </label>
                                <input
                                    name="bv"
                                    type="number"
                                    placeholder="Enter BV"
                                    value={formData.bv}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                            </div>

                            {/* Stock Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Stock <span className="text-green-600">*</span>
                                </label>
                                <input
                                    name="stock"
                                    type="number"
                                    placeholder="Enter stock quantity"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                            </div>

                            {/* Rating Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Rating (0-5) ⭐
                                </label>
                                <input
                                    name="rating"
                                    type="number"
                                    placeholder="Enter rating (0-5)"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                                <p className="text-xs text-gray-500">Rating out of 5 (e.g., 4.5)</p>
                            </div>

                            {/* Number of Reviews Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Number of Reviews 📝
                                </label>
                                <input
                                    name="numReviews"
                                    type="number"
                                    placeholder="Enter number of reviews"
                                    value={formData.numReviews}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white"
                                />
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Description <span className="text-green-600">*</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter product description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white resize-none"
                            />
                        </div>

                        {/* Image Upload Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Product Image
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl cursor-pointer hover:bg-green-700 transform transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    <span className="text-xl">📁</span>
                                    {image ? 'Change Image' : 'Choose Image'}
                                </label>
                            </div>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative inline-block mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-48 h-48 object-cover rounded-xl border-4 border-green-500 shadow-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImage(null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-md"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-4 justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-3 bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2 transform transition-all duration-300 hover:bg-green-700 hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {editingId ? '✏️ Update Product' : '➕ Add Product'}
                                    </>
                                )}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transform transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-3xl text-green-600">📋</span>
                    <span>Products List ({products.length})</span>
                </h2>

                {loading && !products.length ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found. Add your first product!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={product._id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-200"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Product Image */}
                                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-green-50 to-white">
                                    {product.image ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-5xl text-gray-400">
                                            📷
                                            <p className="text-sm mt-2">No Image</p>
                                        </div>
                                    )}

                                    {/* Stock Badge */}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-md ${product.stock > 0
                                        ? 'bg-green-600 text-white'
                                        : 'bg-red-500 text-white'
                                        }`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl font-bold text-green-600">
                                            ₹{product.price}
                                        </span>
                                        {product.oldPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{product.oldPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Rating and Reviews Section */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center gap-1">
                                            {product.rating ? (
                                                <>
                                                    <div className="flex">
                                                        {renderRatingStars(product.rating)}
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-700 ml-1">
                                                        {product.rating}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-sm text-gray-400">No ratings</span>
                                            )}
                                        </div>
                                        {product.numReviews > 0 && (
                                            <span className="text-sm text-gray-500">
                                                ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mb-3">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
                                            BV: {product.bv}
                                        </span>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-semibold">
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1 shadow-md"
                                        >
                                            <span>✏️</span>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1 shadow-md"
                                        >
                                            <span>🗑️</span>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminProducts;