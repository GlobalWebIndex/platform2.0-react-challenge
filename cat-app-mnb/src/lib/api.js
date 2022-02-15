const DOMAIN_URL = 'https://api.thecatapi.com/v1/images/search';
const apiKey = ''

export async function getAllCats() {
  const response = await fetch(`${DOMAIN_URL}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch cats.');
  }

  const transformedCats = [];

  for (const key in data) {
    const catObj = {
      id: key,
      ...data[key],
    };

    transformedCats.push(catObj);
  }

  return transformedCats;
}

export async function getSingleCat(catId) {
  const response = await fetch(`${DOMAIN_URL}/cats/${catId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch cat.');
  }

  const loadedCat = {
    id: catId,
    ...data,
  };

  return loadedCat;
}

