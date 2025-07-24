// Global variable to store weapons data
let weaponsData = [];

// DOM elements
const weaponList = document.getElementById('weaponList');
const categoryFilter = document.getElementById('categoryFilter');
const regionFilter = document.getElementById('regionFilter');

// Fetch weapon data from JSON file
fetch('data/weapons.json')
  .then(response => response.json())
  .then(data => {
    weaponsData = data;
    displayWeapons(weaponsData);
  })
  .catch(err => {
    weaponList.innerHTML = '<p>Error loading weapons data.</p>';
    console.error(err);
  });

// Function to create and show weapon cards
function displayWeapons(weapons) {
  if (!weapons.length) {
    weaponList.innerHTML = '<p>No weapons found.</p>';
    return;
  }

  weaponList.innerHTML = weapons
    .map(weapon => `
      <article class="weapon-card">
        <a href="product.html?id=${weapon.id}">
          <img src="${weapon.image}" alt="${weapon.name}" />
          <h3>${weapon.name}</h3>
        </a>
        <p><strong>Region:</strong> ${weapon.region}</p>
        <p><strong>Category:</strong> ${weapon.category}</p>
        <p><strong>Price:</strong> $${weapon.price.toFixed(2)}</p>
      </article>
    `)
    .join('');
}

// Event listeners for filters
categoryFilter.addEventListener('change', applyFilters);
regionFilter.addEventListener('change', applyFilters);

function applyFilters() {
  const selectedCategory = categoryFilter.value;
  const selectedRegion = regionFilter.value;

  const filteredWeapons = weaponsData.filter(weapon => {
    const categoryMatch = selectedCategory ? weapon.category === selectedCategory : true;
    const regionMatch = selectedRegion ? weapon.region === selectedRegion : true;
    return categoryMatch && regionMatch;
  });

  displayWeapons(filteredWeapons);
}
