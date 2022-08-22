import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar.component';
import NotFound from '../components/notfound/NotFound.component';
import Breeds from './breeds/Breeds.component';
import Favorites from './favorites/Favorites.component';
import Home from './home/Home.component';

const AppInner = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/breeds" element={<Breeds />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppInner;
