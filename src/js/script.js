document.addEventListener("DOMContentLoaded", () => {
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

  const weaponIconContainer = document.getElementById("weapon-icons");

  if (weaponIconContainer) {
    fetch('./data/weapons.json')
      .then(response => response.json())
      .then(weapons => {
        const seenCategories = new Set();

        weapons.forEach(weapon => {
          const category = weapon.category.toLowerCase();
          if (seenCategories.has(category)) return;
          seenCategories.add(category);

          const link = document.createElement('a');
          link.href = `./shop.html?category=${category}`;
          link.className = 'weapon';

          const img = document.createElement('img');
          img.src = weapon.imageUrl;
          img.alt = weapon.name;
          img.width = 130;
          img.height = 130;

          const label = document.createElement('span');
          label.textContent = category.charAt(0).toUpperCase() + category.slice(1);

          link.appendChild(img);
          link.appendChild(label);
          weaponIconContainer.appendChild(link);
        });
      })
      .catch(err => {
        console.error('Error loading category icons:', err);
        weaponIconContainer.textContent = 'Failed to load weapons.';
      });
  }

  const weaponListContainer = document.getElementById("weapon-list");

  if (weaponListContainer) {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');

    fetch('./data/weapons.json')
      .then(res => res.json())
      .then(weapons => {
        const filteredWeapons = categoryParam
          ? weapons.filter(w => w.category.toLowerCase() === categoryParam.toLowerCase())
          : weapons;

        renderWeapons(filteredWeapons, weaponListContainer);
      })
      .catch(err => {
        console.error('Error loading weapons:', err);
        weaponListContainer.innerHTML = `<p>Failed to load weapons.</p>`;
      });
  }
});

function renderWeapons(weapons, container) {
  container.innerHTML = '';

  if (weapons.length === 0) {
    container.innerHTML = `<p>No weapons found in this category.</p>`;
    return;
  }

  weapons.forEach(weapon => {
    const card = document.createElement('div');
    card.className = 'weapon-card';

    card.innerHTML = `
      <img src="${weapon.imageUrl}" alt="${weapon.name}" />
      <h3>${weapon.name}</h3>
      <p><strong>Country:</strong> ${weapon.country}</p>
      <p><strong>Subregion:</strong> ${weapon.subregion}</p>
      <p><strong>Material:</strong> ${weapon.material}</p>
      <p><strong>Price:</strong> $${weapon.price.toLocaleString()}</p>
      <button class="add-to-cart" data-id="${weapon.id}">Add to Cart</button>
    `;

    container.appendChild(card);
  });

  const cartButtons = container.querySelectorAll('.add-to-cart');
  cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const weaponId = e.target.dataset.id;
      addToCart(weaponId);
    });
  });
}

function addToCart(weaponId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(weaponId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Added to cart!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countElement = document.querySelector(".cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});