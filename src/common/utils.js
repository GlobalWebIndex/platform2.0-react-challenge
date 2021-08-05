import {API_KEY} from "./constants";

/**
 * Util for the get requests
 */
export const getData = api =>
    fetch(api, {
        method: 'get',
        headers: {
            'x-api-key': API_KEY
        },
    })
        .then(res => res.json())
        .catch(err=> err);

/**
 * Util for the post requests
 */
export const postData = async (api, param) =>
     await fetch(api, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'x-api-key': API_KEY
        },
        body: JSON.stringify(param)
    })
        .then(res => res.json())
        .catch(err => err);

/**
 * Util for the delete requests
 */
export const deleteData = api =>
    fetch(api, {
        method: 'delete',
        headers: {
            'x-api-key': API_KEY
        },
    })
        .then(res => res.json())
        .catch(err=> err);
