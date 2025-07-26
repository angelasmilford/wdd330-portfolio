document.addEventListener("DOMContentLoaded", () => {
  console.log("Product Detail JS loaded");
  
  const params = new URLSearchParams(window.location.search);
  const weaponId = params.get('id');
  console.log("Weapon ID from URL:", weaponId);

  if (!weaponId) {
    document.getElementById("weapon-details").innerHTML = "<p>Weapon not found.</p>";
    return;
  }

  fetch('./data/weapons.json')
    .then(res => res.json())
    .then(weapons => {
      const weapon = weapons.find(w => w.id === weaponId);
      if (!weapon) {
        document.getElementById("weapon-details").innerHTML = "<p>Weapon not found.</p>";
        return;
      }

      displayWeaponDetails(weapon);
    })
    .catch(err => {
      console.error("Failed to load weapon data:", err);
      document.getElementById("weapon-details").innerHTML = "<p>Error loading weapon details.</p>";
    });
});

function displayWeaponDetails(weapon) {
  const container = document.getElementById("weapon-details");
  container.innerHTML = `
    <h2>${weapon.name}</h2>
    <img src="${weapon.imageUrl}" alt="${weapon.name}" width="300" />
    <p><strong>Country:</strong> ${weapon.country}</p>
    <p><strong>Subregion:</strong> ${weapon.subregion}</p>
    <p><strong>Material:</strong> ${weapon.material}</p>
    <p><strong>Price:</strong> $${weapon.price.toLocaleString()}</p>
  `;
}