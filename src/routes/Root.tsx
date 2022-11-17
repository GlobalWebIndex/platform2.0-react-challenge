import { Link, Outlet } from "react-router-dom";

export function Root() {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <nav>
          <ul className="flex space-x-4">
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
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
}
