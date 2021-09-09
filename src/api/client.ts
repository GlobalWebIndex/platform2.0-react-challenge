import { Constants } from '../constants';
import { Response } from './Response';

enum Method {
    Post = 'POST',
    Get = 'GET',
    Delete = 'Delete'
}

const buildOptions = (
  method: Method,
  customHeaders: Record<string, string> = {},
  body?: Record<string, any>,
): Record<string, any> => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': Constants.X_API_KEY,
  };

  const options: Record<string, any> = {
    method,
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
};

const getHeaderValues = (headers: Headers, requestedHeaders: string[]): Record<string, string> => {
  const foundHeaders: Record<string, string> = {};

  requestedHeaders.forEach((key) => {
    const value = headers.get(key);

    if (value) {
      foundHeaders[key] = value;
    }
  });

  return foundHeaders;
};

export const get = async <T>(
  {
    endpoint,
    customHeaders = {},
    includeHeadersInResponse,
  }: {
    endpoint: string,
    customHeaders?: Record<string, string>,
    includeHeadersInResponse?: string[]
    },
): Promise<Response<T>> => {
  const options = buildOptions(Method.Get, customHeaders);

  let data: T;

  try {
    const response = await fetch(endpoint, options);

    data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const formattedResponse: Response<T> = {
        data,
      };

      if (includeHeadersInResponse && includeHeadersInResponse.length) {
        formattedResponse.headers = getHeaderValues(response.headers, includeHeadersInResponse);
      }

      return formattedResponse;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const post = async <T, B>(
  endpoint: string,
  body: B,
  customHeaders: Record<string, string> = {},
): Promise<T> => {
  const options = buildOptions(Method.Post, customHeaders, body);

  let data: T;

  try {
    const response = await fetch(endpoint, options);

    data = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const del = async <T>(
  endpoint: string,
  customHeaders: Record<string, string> = {},
): Promise<T> => {
  const options = buildOptions(Method.Delete, customHeaders);

  let data: T;

  try {
    const response = await fetch(endpoint, options);
    data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      return data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
