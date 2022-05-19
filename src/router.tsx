import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import App from './components/App';
import Favourites from './components/Favourites';
import Breeds from './components/Breeds';
import { Gallery } from './components/Gallery';
import PageNotFound from './components/PageNotFound';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Gallery />} />

      <Route path="images" element={<Gallery />}>
        <Route path=":id" element={<Gallery />} />
      </Route>

      <Route path="breeds" element={<Breeds />}>
        <Route path=":id" element={<Breeds />} />
      </Route>

      <Route path="favourites" element={<Favourites />}>
        <Route path=":id" element={<Favourites />} />
      </Route>

      <Route path="not_found" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/not_found" replace />} />
    </Route>
  </Routes>
);

export default AppRouter;
