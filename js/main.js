// =====================================
// 🛍️ E-Commerce Website Script (Full Version)
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // 📦 Product Data
  // ===============================
  const products = [
    // 🧭 Electronics
    { id: 1, name: "Smartphone X", price: 12999, image: "img/p1.jpg", description: "Powerful smartphone with great camera.", category: "electronics" },
    { id: 2, name: "Laptop Pro", price: 49999, image: "img/p2.jpg", description: "Sleek laptop with fast performance.", category: "electronics" },
    { id: 3, name: "Smartwatch", price: 2999, image: "img/p3.jpg", description: "Track fitness and notifications easily.", category: "electronics" },
    { id: 4, name: "Bluetooth Speaker", price: 1999, image: "img/p4.jpg", description: "Portable and powerful sound.", category: "electronics" },
    { id: 5, name: "Wireless Earbuds", price: 1499, image: "img/p5.jpg", description: "Crystal clear sound.", category: "electronics" },
    { id: 6, name: "Gaming Mouse", price: 899, image: "img/p6.jpg", description: "RGB lighting and precision.", category: "electronics" },
    { id: 7, name: "Tablet", price: 9999, image: "img/p7.jpg", description: "Perfect for study and entertainment.", category: "electronics" },
    { id: 8, name: "Camera Lens", price: 6999, image: "img/p8.jpg", description: "High quality zoom lens.", category: "electronics" },
    { id: 9, name: "Monitor", price: 7999, image: "img/p9.jpg", description: "Full HD LED Display.", category: "electronics" },
    { id: 10, name: "Power Bank", price: 1199, image: "img/p10.jpg", description: "10000mAh fast charging.", category: "electronics" },

    // 👕 Fashion
    { id: 11, name: "Casual Shirt", price: 999, image: "img/f1.jpg", description: "Cotton shirt with stylish fit.", category: "fashion" },
    { id: 12, name: "Jeans", price: 1499, image: "img/f2.jpg", description: "Comfortable stretchable denim.", category: "fashion" },
    { id: 13, name: "Jacket", price: 2599, image: "img/f3.jpg", description: "Trendy winter jacket.", category: "fashion" },
    { id: 14, name: "Sneakers", price: 1999, image: "img/f4.jpg", description: "Lightweight sneakers for daily wear.", category: "fashion" },
    { id: 15, name: "Saree", price: 2499, image: "img/f5.jpg", description: "Beautiful silk saree.", category: "fashion" },
    { id: 16, name: "Kurta Set", price: 1899, image: "img/f6.jpeg", description: "Traditional festive wear.", category: "fashion" },
    { id: 17, name: "Cap", price: 499, image: "img/f7.jpeg", description: "Stylish baseball cap.", category: "fashion" },
    { id: 18, name: "Wallet", price: 2999, image: "img/f8.jpg", description: "Genuine leather wallet.", category: "fashion" },
    { id: 19, name: "T-shirt", price: 799, image: "img/f9.jpg", description: "Soft cotton round neck.", category: "fashion" },
    { id: 20, name: "Handbag", price: 1299, image: "img/f10.jpg", description: "Premium leather handbag.", category: "fashion" },

    // 🎧 Accessories
    { id: 21, name: "Sunglasses", price: 799, image: "img/a1.jpg", description: "UV protected stylish shades.", category: "accessories" },
    { id: 22, name: "Ring", price: 999, image: "img/a2.jpg", description: "Premium meterial ring.", category: "accessories" },
    { id: 23, name: "Backpack", price: 1499, image: "img/a3.jpg", description: "Durable backpack for travel.", category: "accessories" },
    { id: 24, name: "Bracelet", price: 699, image: "img/a4.jpg", description: "Elegant wrist bracelet.", category: "accessories" },
    { id: 25, name: "Belt", price: 599, image: "img/a5.jpg", description: "Classic leather belt.", category: "accessories" },
    { id: 26, name: "Hat", price: 499, image: "img/a6.jpg", description: "Summer beach hat.", category: "accessories" },
    { id: 27, name: "Necklace", price: 899, image: "img/a7.jpg", description: "Stylish silver necklace.", category: "accessories" },
    { id: 28, name: "Earrings", price: 499, image: "img/a8.jpg", description: "Beautiful pearl earrings.", category: "accessories" },
    { id: 29, name: "Keychain", price: 299, image: "img/a9.jpg", description: "Metal keychain pack.", category: "accessories" },
    { id: 30, name: "Watch Strap", price: 499, image: "img/a10.jpg", description: "Leather replacement strap.", category: "accessories" }
  ];

  // ===============================
  // 🛒 Cart & Elements
  // ===============================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  // ===============================
  // 🏬 Render Products
  // ===============================
  function renderProducts(filter = "all") {
    if (!productList) return;
    productList.innerHTML = "";
    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
    filtered.slice(0, 10).forEach(p => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.name}</h5>
            <p class="text-muted mb-2">₹${p.price}</p>
            <p class="small">${p.description}</p>
            <button class="btn btn-primary add-to-cart" data-id="${p.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>`;
      productList.appendChild(col);
    });
  }

  renderProducts(); // Default show all

  // ===============================
  // 🔘 Filter Buttons
  // ===============================
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.category;
      if (category === "home") {
        window.location.href = "index.html";
      } else {
        renderProducts(category);
      }
    });
  });

  // ===============================
  // ➕ Add to Cart
  // ===============================
  document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      saveCart();
      showToast(`${product.name} added to cart 🛒`);
    }
  });

  // ===============================
  // 💾 Save & Render Cart
  // ===============================
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = `<tr><td colspan="6" class="text-center">Your cart is empty 😕</td></tr>`;
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${item.image}" alt="${item.name}" width="60" class="rounded"></td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td><input type="number" class="form-control text-center quantity-input" min="1" value="${item.quantity}" data-index="${index}"></td>
          <td>₹${item.price * item.quantity}</td>
          <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}"><i class="bi bi-trash"></i></button></td>`;
        cartContainer.appendChild(row);
      });
    }

    if (totalPriceEl) totalPriceEl.textContent = `₹${total}`;
  }

  renderCart();

  // ===============================
  // 🗑️ Remove & Update Quantity
  // ===============================
  if (cartContainer) {
    cartContainer.addEventListener("click", e => {
      if (e.target.closest(".remove-item")) {
        const index = e.target.closest(".remove-item").dataset.index;
        cart.splice(index, 1);
        saveCart();
        showToast("Item removed ❌");
      }
    });

    cartContainer.addEventListener("input", e => {
      if (e.target.classList.contains("quantity-input")) {
        const index = e.target.dataset.index;
        const newQty = parseInt(e.target.value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
          saveCart();
        }
      }
    });
  }

  // ===============================
  // 💳 Checkout
  // ===============================
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", e => {
      e.preventDefault();
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("Payment Successful! 🎉 Thank you for shopping with us.");
      cart = [];
      saveCart();
      checkoutForm.reset();
    });
  }

  // ===============================
  // 🔔 Toast Notification
  // ===============================
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast align-items-center text-bg-primary border-0 position-fixed bottom-0 end-0 m-4";
    toast.role = "alert";
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>`;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 2000 });
    bsToast.show();
    toast.addEventListener("hidden.bs.toast", () => toast.remove());
  }

});