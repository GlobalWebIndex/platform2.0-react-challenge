import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CatDetail from "./pages/CatDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import { useMyBeatifulHook } from "./pages/AllCats";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllCats = React.lazy(() => import("./pages/AllCats"));

function App() {
  const { status, cats, error, onLoadMore } = useMyBeatifulHook();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/cats" />} />
        <Route
          path="/cats"
          element={
            <React.Suspense fallback={<LoadingSpinner />}>
              <AllCats
                status={status}
                cats={cats}
                error={error}
                onLoadMore={onLoadMore}
              />
            </React.Suspense>
          }
        />
        {/* <Route path="/breeds" element={<Breeds />} /> */}
        <Route path="/cats/:catId" element={<CatDetail />} />
        {/* <Route path="/breeds/:breedId" element={<BreedDetail />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

//CatDetail could take a property from the cat,
