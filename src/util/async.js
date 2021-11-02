import localforage from "localforage"
import axios from "axios"
import omit from "lodash/omit"
import {
  API_KEY,
  REQUEST_BASEPATH,
  IMAGES_REQUEST_PATH,
  BREEDS_REQUEST_PATH
} from "../constants"

/**
 * Asynchronous helper function to return the data to the callee.
 * By default checks whether the data are stored in the indexDB and returns them.
 * If not, makes a request, returns the data and store them in indexDB.
 * 
 * @param {String} dataKey 
 *   The 'key' of the indexDB record.
 * @param {Number} page
 *   The page number to be used on the request.
 * 
 * @returns {Array}
 *   The set of data as stored in the indexDB.
 */
export async function fetchData({ 
  dataKey,
  requestRoute,
  requestParams,
  page = 1,
}) {
  let storedData = await getStoredItems(dataKey)
  const storedDataPager = await localforage.getItem(`${dataKey}-pager`) || 0

  if (storedDataPager < page) {
    const { data } = await axios.get(`${REQUEST_BASEPATH}${requestRoute}?${requestParams}`)
    const updatedData = {...storedData, ...arrayToObjectById(data)}
    localforage.setItem(dataKey, updatedData)
    localforage.setItem(`${dataKey}-pager`, page)
    storedData = updatedData
  }

  return storedData
}

/**
 * Asynchronous helper function to return the image data.
 * By default checks whether the data are stored in the indexDB and returns them.
 * If not, makes a request, returns the data and store them in indexDB.
 * 
 * @param {String} imageId
 *   The image id as returned from the api.
 * 
 * @returns {Object}
 *   The information about the image.
 */
export async function getImage(imageId) {
  const storedData = await getStoredItems('images')
  let imageView = Object.values(storedData).find(image => image.id === imageId)

  if (!imageView) {
    const { data } = await axios.get(`${REQUEST_BASEPATH}images/${imageId}`)
    const updatedData = {...storedData, ...arrayToObjectById([data])}
    localforage.setItem('images', updatedData)
    imageView = data
  }

  return imageView
}

/**
 * Asynchronous helper function to return the data for a specific breed.
 * By default checks whether the data are stored in the indexDB and returns them.
 * If not, makes a request, returns the data and store them in indexDB.
 * 
 * At all cases we need to enhance the information of the requested
 * breed with extra images of that breed.
 * 
 * @param {String} breedId 
 *   The string id of the breed as returned from the API.
 *  
 * @returns {Object}
 *   An object containing the breed data for the specific id, 
 *   including extra images for that breed.
 */
export async function getBreedById(breedId) {
  let storedData = await getStoredItems('breeds')
  let breedData = storedData?.[breedId] || {}

  // If no data available, we need to make a request to get all breeds.
  if (!Object.values(breedData).length) {
    storedData = await fetchData({ 
      dataKey: "breeds",
      requestRoute: BREEDS_REQUEST_PATH,
      requestParams: `attach_breed=0`
    })

    breedData = storedData[breedId]
  }

  // At all cases we need to enhance the stored data with extra 
  // breed images.
  if (!breedData?.extraImages) {
    const { data } = await axios.get(`${REQUEST_BASEPATH}${IMAGES_REQUEST_PATH}?breed_ids=${breedId}&limit=8`)

    // Get only the id and the image url from each image and 
    // store it as part of the breed information.
    breedData = {
      ...breedData,
      extraImages: data.map(
        item => ({ id: item.id, url: item.url })
      )
    }

    // Need to update the localstorage with the extra images as well.
    const updatedData = {
      ...storedData,
      [breedId]: breedData
    }
    localforage.setItem('breeds', updatedData)
  }

  return breedData
}

/**
 * Asynchronous helper function that is responsible for adding and
 * removing items to the favourites list.
 * The favourites list is always stored in the indexDB, so based on
 * that information, adds the item if it isn't available or removes
 * it if it is already there.
 * 
 * @param {String} imageId 
 *   The image id as this is returned from the API.
 * @returns {Object}
 *   Format: { isFavourited: Boolean, errorThrown: Boolean }
 *   An object that holds 2 pieces of information:
 *   - Whether the item is favourited or not
 *   - Whether an error has been caught during the request.
 */
export async function favouritesRequests(imageId) {
  let storedFavs = await getStoredItems('favourites')
  const storedFav = storedFavs[imageId] || {}
  let isFavourited = !!Object.values(storedFav).length
  let errorThrown = false

  try {
    const response = await axios({
      method: isFavourited ? 'delete' : 'post',
      url: `${REQUEST_BASEPATH}favourites/${isFavourited ? storedFav.favId : ''}`,
      headers: {
        'x-api-key': API_KEY,
        'content-type': 'application/json'
      },
      data: isFavourited ? {} : {
        image_id: imageId
      }
    })
  
    const updatedData = !isFavourited 
    ? {
      ...storedFavs,
      [imageId]: {
        imageId,
        favId: response.data.id
      }
    }
    : omit(storedFavs, [imageId])

    // In case the request has failed the result of the 'isFavourited'
    // should remain the same as no action has been completed.
    // In case the request is successful, the result is reverted 
    // since this function is responsible for both adding and deleting 
    // an item.
    isFavourited = !isFavourited
  
    // Always keep the indexDB up-to-date.
    localforage.setItem('favourites', updatedData)
  } catch(error) {
    errorThrown = true
  }

  return {
    isFavourited,
    errorThrown
  }
}

/**
 * Asynchronous helper function that returns information from
 * the indexDB by the key.
 *  
 * @param {String} dataKey
 *   A string defining the indexDB key.
 * @returns {Object}
 */
export async function getStoredItems(dataKey) {
  return await localforage.getItem(dataKey) || {}
}

/**
 * Helper function that parses the data from the response and 
 * transform them from array to an object with ids as object keys.
 * 
 * Example: 
 * [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Beta' }] => 
 * { a: { id: 'a', name: 'Alpha' }, b: { id: 'b', name: 'Beta' }}
 * 
 * @param {Array} data 
 *   The data as returned from the API.
 * @returns 
 *    An object with the id as key.
 */
function arrayToObjectById(data) {
  return data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
}