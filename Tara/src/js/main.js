// src/js/main.js

import { fetchCountryData, fetchExtraCountryInfo, fetchImages } from './api.js';

// DOM references
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const cityInput = document.querySelector('#city-input'); // Optional city input
const infoContainer = document.querySelector('#country-info');
const imageGallery = document.querySelector('#image-gallery');
const historyContainer = document.getElementById('search-history');
const themeToggleBtn = document.getElementById('theme-toggle');
const favBtn = document.getElementById('show-favorites');
const favList = document.getElementById('favorites-list');

// ------------------ THEME TOGGLE ------------------
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// ------------------ SEARCH FORM SUBMIT ------------------
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const country = input.value.trim();
  const city = cityInput.value.trim();

  if (!country) return;

  infoContainer.innerHTML = 'Loading...';
  imageGallery.innerHTML = '';

  try {
    const countryData = await fetchCountryData(country);
    const images = await fetchImages(city ? `${city}, ${country}` : countryData.name.common);

    await displayCountryInfo(countryData);
    displayImages(images);
    updateSearchHistory(countryData.name.common);

    // Add Save to Favorites Button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save to Favorites';
    saveBtn.type = 'button';
    saveBtn.classList.add('save-fav'); // added class to save button
    saveBtn.addEventListener('click', () => {
      let favs = JSON.parse(localStorage.getItem('favorites')) || [];
      const name = countryData.name.common;
      if (!favs.includes(name)) {
        favs.push(name);
        localStorage.setItem('favorites', JSON.stringify(favs));
        alert(`${name} added to favorites!`);
      }
    });
    infoContainer.appendChild(saveBtn);
  } catch (err) {
    infoContainer.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  }
});

// ------------------ DISPLAY COUNTRY INFO ------------------
async function displayCountryInfo(country) {
  const extra = await fetchExtraCountryInfo(country.name.common);

  const html = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
    <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>

    ${extra ? `
      <p><strong>Most Populous Tribe:</strong> ${extra.tribe}</p>
      <p><strong>Currency:</strong> ${extra.currency}</p>
      <p><strong>President:</strong> ${extra.president}</p>
      <p><strong>National Team:</strong> ${extra.nationalTeam}</p>
      <p><strong>Popular Musicians:</strong> ${extra.musicians.join(', ')}</p>
      <p><strong>Top Tourist Attractions:</strong></p>
      <ul>
        ${extra.topAttractions.map(item => `<li>${item}</li>`).join('')}
      </ul>
    ` : '<p><em>No extra information available for this country.</em></p>'}
  `;

  infoContainer.innerHTML = html;
}

// ------------------ DISPLAY IMAGE GALLERY ------------------
function displayImages(images) {
  const html = images.map(img => `
    <img src="${img.urls.small}" alt="${img.alt_description}" loading="lazy">
  `).join('');
  imageGallery.innerHTML = html;
}

// ------------------ SEARCH HISTORY ------------------
function updateSearchHistory(name) {
  let history = JSON.parse(localStorage.getItem('search-history')) || [];
  if (!history.includes(name)) {
    history.unshift(name);
    if (history.length > 5) history.pop();
    localStorage.setItem('search-history', JSON.stringify(history));
  }
  renderSearchHistory();
}

function renderSearchHistory() {
  const history = JSON.parse(localStorage.getItem('search-history')) || [];
  historyContainer.innerHTML = history.map(c => `<button class="history-btn">${c}</button>`).join('');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('history-btn')) {
    input.value = e.target.textContent;
    form.dispatchEvent(new Event('submit'));
  }
});

// ------------------ SHOW FAVORITES ------------------
favBtn?.addEventListener('click', () => {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  favList.innerHTML = favs.length
    ? favs.map(c => `<button class="fav-btn">${c}</button>`).join('')
    : '<p>No favorites yet.</p>';
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('fav-btn')) {
    input.value = e.target.textContent;
    form.dispatchEvent(new Event('submit'));
  }
});

// ------------------ INITIALIZE ------------------
renderSearchHistory();


