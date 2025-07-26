document.addEventListener("DOMContentLoaded", () => {
  loadHeaderAndFooter();
  displayCartItems();
  setupCheckoutButton();
});

function loadHeaderAndFooter() {
  fetch("./partials/header.html")
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById("header");
      if (header) header.innerHTML = data;
    });

  fetch("./partials/footer.html")
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = data;
    });
}

async function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const response = await fetch("./data/weapons.json");
  const allWeapons = await response.json();
  const cartWeapons = allWeapons.filter(w => cart.includes(w.id));

  cartWeapons.forEach(weapon => {
    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
      <img src="${weapon.imageUrl}" alt="${weapon.name}" />
      <div>
        <h3>${weapon.name}</h3>
        <p><strong>Price:</strong> $${weapon.price.toLocaleString()}</p>
        <button class="remove-item" data-id="${weapon.id}">Remove</button>
      </div>
    `;

    cartContainer.appendChild(item);
  });

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeFromCart(id);
    });
  });
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(itemId => itemId !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function setupCheckoutButton() {
  const checkoutBtn = document.getElementById("checkout-button");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      alert("Thank you for your purchase!");
      localStorage.removeItem("cart");
      window.location.href = "./index.html";
    });
  }
}