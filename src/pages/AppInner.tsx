import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar.component';
import NotFound from '../components/notfound/NotFound.component';
import Breeds from './breeds/Breeds.component';
import Favorites from './favorites/Favorites.component';
import Home from './home/Home.component';
import { PaletteMode } from '@mui/material';

interface AppInnerProps {
    mode: PaletteMode;
    setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

const AppInner: React.FC<AppInnerProps> = ({ mode, setMode }) => {
    return (
        <BrowserRouter>
            <Navbar mode={mode} setMode={setMode} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/breeds" element={<Breeds />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppInner;
