import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  Outlet,
  Link as RouterLink,
  ScrollRestoration,
} from "react-router-dom";
import { Link } from "~/ui";

import { FavouritesService } from "~/api";

// this is bootstraping the data for app, think something like get countries, currencies that you fetch and cache once
// we need to fetch favourites here because we use them on every single page
// to indicate if item is in favourites
export async function bootstrap() {
  return await FavouritesService.getFavourites();
}

export function Layout() {
  return (
    <div className="h-screen bg-crimson-1">
      <div className="">
        <header className="bg-mauve-2 pl-4 pr-8 h-14 flex justify-start p-4 border-b-mauve-8 border-b-2 border-solid sticky top-0 z-10 bg-white">
          <nav className="flex w-full justify-between">
            <RouterLink className="flex space-x-1 items-center " to="/">
              <InstagramLogoIcon />
              <span>Catsta</span>
            </RouterLink>
            <ul className="flex space-x-4 divide-dark-900">
              <li>
                <Link className="text-crimson-12 hover:underline" to="breeds">
                  Breeds
                </Link>
              </li>
              <li>
                <Link
                  className="text-crimson-12 hover:underline"
                  to="favorites"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 py-1 max-w-screen-lg mx-auto">
          <Outlet />
        </main>
        <ScrollRestoration />
      </div>
    </div>
  );
}
