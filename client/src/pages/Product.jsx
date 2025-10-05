import React, { useState, useEffect } from "react";
import Header from "../components/Header";

// ✅ Dữ liệu mẫu sản phẩm
const productsData = [
  { productId: 1, productName: "Dog Food Premium", price: 120, stockQuantity: 50, status: "Available", categoryId: "Food" },
  { productId: 2, productName: "Cat Toy Ball", price: 30, stockQuantity: 100, status: "Available", categoryId: "Toys" },
  { productId: 3, productName: "Pet Shampoo", price: 70, stockQuantity: 40, status: "Available", categoryId: "Care" },
  { productId: 4, productName: "Dog Leash", price: 90, stockQuantity: 20, status: "Available", categoryId: "Accessories" },
  { productId: 5, productName: "Cat Scratching Post", price: 200, stockQuantity: 10, status: "Out of Stock", categoryId: "Toys" },
  { productId: 6, productName: "Fish Food", price: 50, stockQuantity: 60, status: "Available", categoryId: "Food" },
];

// ✅ Danh mục sản phẩm
const categories = ["All", "Food", "Toys", "Care", "Accessories"];

// ✅ Mức giá
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [cart, setCart] = useState([]);

  // 🔄 Lấy giỏ hàng từ localStorage khi load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 💾 Lưu giỏ hàng mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🧮 Lọc sản phẩm theo bộ lọc
  const filteredProducts = productsData.filter((p) => {
    const inCategory =
      selectedCategory === "All" || p.categoryId === selectedCategory;

    const priceRange = priceRanges.find((r) => r.label === selectedPrice);
    const inPrice =
      priceRange && p.price >= priceRange.min && p.price <= priceRange.max;

    return inCategory && inPrice;
  });

  // 🛒 Xử lý Add to Cart (chạy ở frontend)
  const handleAddToCart = (product) => {
    if (product.status !== "Available") return;

    // Tìm xem sản phẩm đã có trong giỏ chưa
    const existing = cart.find((item) => item.productId === product.productId);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.productId,
          productName: product.productName,
          price: product.price,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    // Tính tổng tiền
    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    localStorage.setItem("totalPrice", total.toFixed(2));

    alert(`✅ Added "${product.productName}" to cart!`);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🧭 Bộ lọc */}
          <div className="w-full lg:w-1/4 border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Lọc theo category */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category:</label>
              <select
                className="w-full border rounded p-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Lọc theo giá */}
            <div>
              <label className="block mb-2 font-semibold">Price:</label>
              <select
                className="w-full border rounded p-2"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map((range) => (
                  <option key={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 🛍️ Danh sách sản phẩm */}
          <div className="w-full lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
                  >
                    <h2 className="text-lg font-semibold mb-1">
                      {product.productName}
                    </h2>
                    <p className="text-gray-500 text-sm mb-1">
                      Category: {product.categoryId}
                    </p>
                    <p className="text-blue-600 font-bold mb-1">
                      ${product.price}
                    </p>
                    <p
                      className={`font-medium mb-1 ${
                        product.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.status}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      Stock: {product.stockQuantity}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`mt-3 w-full py-2 rounded transition ${
                        product.status === "Available"
                          ? "bg-orange-400 text-white hover:bg-orange-500"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                      disabled={product.status !== "Available"}
                    >
                      {product.status === "Available"
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No products found.
              </p>
            )}
          </div>
        </div>

        {/* 🧾 Hiển thị tổng tiền giỏ hàng */}
        <div className="mt-10 border-t pt-4 text-right">
          <h3 className="text-lg font-semibold">
            Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </h3>
          <p className="text-xl text-orange-600 font-bold">
            Total Price: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
