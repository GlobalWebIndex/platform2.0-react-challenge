import config from 'data/config';
import Cat from 'types';

function endpoint(url: string) {
  return `${config.api.domain}/${config.api.version}/${url}`;
}

async function status<T>(response: Response) {
  if (response.status >= 400) {
    throw Error(response.statusText);
  }

  const result = await response.json();

  return result as T;
}

type RequestData = {
  body?: Record<string, unknown> | null;
  headers?: HeadersInit | null;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

async function fetchData<T>(url: string, requestData?: RequestData) {
  const request = new Request(endpoint(url), {
    method: requestData?.method,
    body: JSON.stringify(requestData?.body),
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-api-key': config.api.key,
      ...requestData?.headers
    })
  });

  const result = await fetch(request);
  const payload = await status<T>(result);

  return payload;
}

export type Payload = Record<string, unknown>;

const Api = {
  search(page?: number) {
    const params = new URLSearchParams();
    params.append('limit', config.api.limit.toString());
    params.append('order', 'Rand');

    if (page) params.append('page', page.toString());

    return fetchData<Cat.Image[]>(`images/search?${params.toString()}`);
  },
  getImage(id: string) {
    return fetchData<Cat.Image>(`images/${id}`);
  },
  breeds: {
    getAll() {
      return fetchData<Cat.Breed[]>('breeds');
    },
    getImages(breedId: string) {
      return fetchData<Cat.Image[]>(
        `images/search/?breed_ids=${breedId}&limit=${config.api.limit}`
      );
    }
  },
  favourites: {
    getAll() {
      return fetchData<Cat.FavouriteImage[]>('favourites');
    },
    add(id: string) {
      return fetchData<{ id: string }>('favourites', {
        method: 'POST',
        body: { image_id: id }
      });
    },
    remove(id: string) {
      return fetchData<unknown>(`favourites/${id}`, {
        method: 'DELETE'
      });
    }
  }
};

export default Api;
