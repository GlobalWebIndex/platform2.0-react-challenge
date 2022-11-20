import { Link, Outlet, ScrollRestoration } from "react-router-dom";

export function Root() {
  return (
    <div className="max-w-screen-md mx-auto">
      <header className="h-14 flex justify-center p-4 border-pink-400 border-solid border sticky top-0 z-10 bg-white rounded-md">
        <nav className="">
          <ul className="flex space-x-8">
            <li>
              <Link className="hover:underline" to="feed">
                Feed
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="breeds">
                Breeds
              </Link>
            </li>
            <li>
              <Link className="hover:underline" to="favorites">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 py-1">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
