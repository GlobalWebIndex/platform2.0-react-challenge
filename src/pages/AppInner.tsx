import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar.component';
import NotFound from '../components/notfound/NotFound.component';
import Breeds from './breeds/Breeds.component';
import Favorites from './favorites/Favorites.component';
import Home from './home/Home.component';
import { PaletteMode } from '@mui/material';

interface AppInnerProps {
    mode: string | undefined;
    setMode: React.Dispatch<React.SetStateAction<PaletteMode | undefined>>;
}

const AppInner: React.FC<AppInnerProps> = ({ mode, setMode }) => {
    return (
        <BrowserRouter>
            <Navbar mode={mode} setMode={setMode} />
            <Box bgcolor={'Background.default'}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/breeds" element={<Breeds />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
};

export default AppInner;
