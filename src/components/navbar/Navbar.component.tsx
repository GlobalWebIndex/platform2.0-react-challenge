import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router';
import { DarkMode, LightMode } from '@mui/icons-material';
import Logo from '../icons/Logo.component';
import { StyledButton } from './Navbar.styled';
import { NavLink } from 'react-router-dom';
import { PaletteMode } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import OptionsMenu from './optionsMenu/OptionsMenu.component';
import theme from '../../styles/theme';

interface NavbarProps {
    mode: PaletteMode;
    setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

const Navbar: React.FC<NavbarProps> = ({ mode, setMode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorElement] = useState<(EventTarget & HTMLElement) | null>(null);

    const handleOptionsMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
        setIsMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setAnchorElement(null);
        setIsMenuOpen(false);
    };

    const handleThemeMode = () => setMode(mode === 'light' ? 'dark' : 'light');

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Grid justifyContent={'space-between'} alignItems="center" container sx={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Grid item>
                        <Button
                            disableRipple
                            sx={{
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                            startIcon={<Logo style={{ width: 40, height: 40 }} />}
                            color="inherit"
                            onClick={() => navigate('/')}
                        >
                            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
                                Cat Lover Revisited
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <StyledButton active={location.pathname === '/'} color="inherit" theme={theme}>
                                <NavLink to="/">Cats</NavLink>
                            </StyledButton>
                            <StyledButton active={location.pathname === '/breeds'} color="inherit" theme={theme}>
                                <NavLink to="/breeds">Breeds</NavLink>
                            </StyledButton>
                            <StyledButton active={location.pathname === '/favorites'} color="inherit" theme={theme}>
                                <NavLink to="/favorites">Favorites</NavLink>
                            </StyledButton>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" onClick={handleThemeMode}>
                            {mode === 'light' ? <DarkMode /> : <LightMode />}
                        </IconButton>
                        <IconButton color="inherit" onClick={(event) => handleOptionsMenu(event)}>
                            <MoreVertIcon />
                        </IconButton>
                        <OptionsMenu open={isMenuOpen} anchorEl={anchorEl} onClose={handleCloseMenu} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
