// src/js/api.js

const COUNTRY_API = 'https://restcountries.com/v3.1/name/';
const UNSPLASH_API = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = '4Kn_Js6LcvuRDAogFWpS7RO4nO3xjBsNVKwNmzTRpec'; 


/**
 * Fetch country info by name
 * @param {string} countryName
 * @returns {Promise<object>}
 */
export async function fetchCountryData(countryName) {
  try {
    const res = await fetch(`${COUNTRY_API}${countryName}?fullText=true`);
    if (!res.ok) throw new Error('Country not found');
    const data = await res.json();
    return data[0];
  } catch (err) {
    console.error('Error fetching country data:', err);
    throw err;
  }
}

/**
 * Fetch images from Unsplash for a country or city
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function fetchImages(query) {
  try {
    const res = await fetch(`${UNSPLASH_API}?query=${query}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch images');
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error('Error fetching images:', err);
    throw err;
  }
}


export async function fetchExtraCountryInfo(countryName) {
  try {
    const res = await fetch('json/extra-country-info.json');
    const allData = await res.json();
    const key = countryName.toLowerCase();

    if (allData[key]) {
      return allData[key];
    } else {
      console.warn(`No extra info found for ${countryName}`);
       console.log("Country data:", allData);
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch extra country info:', error);
    return null;
  }
}

