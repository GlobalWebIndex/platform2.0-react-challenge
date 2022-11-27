import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

// separation from main for future context, althoug with
// new data routing paradigm of react-router v 6.4 it might be merged with main
export function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
