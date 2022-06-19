import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'features/home/screens/Home';
import NotFound from 'common/screens/NotFound';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
