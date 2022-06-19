import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'features/home/screens/Home';
import Breeds from 'features/breeds/screens/Breeds';
import Favorites from 'features/favorites/screens/Favorites';
import NotFound from 'common/screens/NotFound';
import Layout from 'common/components/Layout';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;
