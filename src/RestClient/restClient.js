import { call } from 'redux-saga/effects'
import { API_KEY } from '../AppCore/common/constants';
import { HTTP_HEADERS, HTTP_METHODS } from './httpConstants';

/**
 * Constant for adding "https://api.thecatapi.com/v1" at all rest calls
 * @type {string}
 */
const CATS_API_PREFIX = 'https://api.thecatapi.com/v1';

/**
 * Performs a http request and returns the response payload.
 *
 * @param {String} method - The HTTP method to use.
 * @param {String} url - The url of the request.
 * @param {Object.<String, *>} body - The request's body.
 * @param {Object.<String, *>} headers - The request's header.
 * @returns {Object.<String, *>}
 */
export function* baseRequest(method, url, body, headers) {
  const requestParams = { headers, method };
  if (body) {
    requestParams.body = JSON.stringify(body);
  }
  return yield fetch(url, requestParams).then((httpResponse) => {
    if (httpResponse.ok) {
      return httpResponse.json();
    }
  }).then((response) => {
    return response;
  });
}

/**
 * Performs an api request (handling both authenticated and un-authenticated cases)
 * and returns the response payload.
 *
 * @param {String} method - The HTTP method to use.
 * @param {String} url - The url of the request.
 * @param {Object.<String, *>} body - The request's body.
 * @returns {Object.<String, *>}
 */
export const apiRequest = (method, url, body) => {
  // When api-key is present in the local storage an authenticated request shall be performed.
  const headers = {
    [HTTP_HEADERS.X_API_KEY]: localStorage.getItem(API_KEY),
  ...(method === HTTP_METHODS.POST) && { [HTTP_HEADERS.CONTENT_TYPE]: 'application/json' },
  };
  return baseRequest(
    method,
    `${CATS_API_PREFIX}${url}`,
      body,
    headers
  );
};

/**
 * Submits a "Query" (GET Http request) to the server.
 *
 * @param {String} uri - The uri that will serve the data.
 * @returns {Object.<String, *>}
 */
export function* requestData(uri) {
  return yield call(apiRequest, HTTP_METHODS.GET, uri);
}

/**
 * Submits a command to the backend.
 *
 * @param {Object.<String, *>} request - The http request.
 * @param {String} request.url - The uri that will serve the data.
 * @param {Object.<String, *>} request.body - The request's body.
 * @param {String} request.method - The http method to be used.
 * @returns {Object.<String, *>}
 */
export function* basicSubmitCommand(request) {
  // Submit the command.
  return yield call(
      apiRequest,
      request.method,
      request.url,
      request.body,
  );
}

/**
 * Submits a synchronous "Command" (POST/PUT/DELETE Http requests) to the server.
 *
 * @param {String} url - The uri that will serve the data.
 * @param {Object.<String, *>} body - The request's body.
 * @param {String} [method='post'] - The http method to be used.
 * @returns {Object.<String, *>}
 */
export default function* submitCommand(url, body, method = HTTP_METHODS.POST) {
  return yield call(basicSubmitCommand, { method, url, body });
}
