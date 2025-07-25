document.addEventListener("DOMContentLoaded", () => {
  fetch("./partials/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header").innerHTML = data);

  fetch("./partials/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);
});


// Get the category from the URL
const params = new URLSearchParams(window.location.search);
const categoryParam = params.get('category');

// Capitalize first letter to match JSON category (e.g., "Club")
const formattedCategory = categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase() : null;

fetch('../public/data/weapons.json')
  .then(res => res.json())
  .then(weapons => {
    const filteredWeapons = formattedCategory
      ? weapons.filter(w => w.category === formattedCategory)
      : weapons;

    renderWeapons(filteredWeapons);
  })
  .catch(err => {
    console.error('Error loading weapons:', err);
  });

function renderWeapons(weapons) {
  const container = document.getElementById('product-list');
  container.innerHTML = ''; // Clear old content

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
    `;
    container.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("weapon-list");

  fetch('/data/weapons.json')
    .then(response => response.json())
    .then(weapons => {
      weapons.forEach(weapon => {
        const link = document.createElement('a');
        link.href = weapon.link;
        link.className = 'weapon';

        const img = document.createElement('img');
        img.src = weapon.image;
        img.alt = weapon.name;
        img.width = 80;
        img.height = 80;

        const label = document.createElement('span');
        label.textContent = weapon.name;

        link.appendChild(img);
        link.appendChild(label);

        container.appendChild(link);
      });
    })
    .catch(err => {
      container.textContent = 'Failed to load weapons.';
      console.error(err);
    });
});

