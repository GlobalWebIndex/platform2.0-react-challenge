import { Routes, Route } from 'react-router-dom';

import Home from 'features/home/screens/Home';
import Breeds from 'features/breeds/screens/Breeds';
import Favorites from 'features/favorites/screens/Favorites';
import NotFound from 'common/screens/NotFound';
import Layout from 'common/components/Layout';
import CatDetailsModal from 'features/home/screens/Home/CatDetailsModal';

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/cats/:id" element={<CatDetailsModal />} />
        </Route>
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default Router;
