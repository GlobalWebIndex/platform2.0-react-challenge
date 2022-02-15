import { Route, Routes, Navigate } from "react-router-dom";
import AllCats from "./pages/AllCats";
import CatDetail from "./pages/CatDetail";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/cats" />} />
        <Route path="/cats" element={<AllCats />} />
        <Route path="/cats/:catId" element={<CatDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
