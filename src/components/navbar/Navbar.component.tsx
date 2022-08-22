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

interface NavbarProps {
    mode: string | undefined;
    setMode: React.Dispatch<React.SetStateAction<PaletteMode | undefined>>;
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
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent={'space-between'} alignItems="center" container>
                    <Grid item>
                        <Button
                            disableRipple
                            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                            startIcon={<Logo style={{ width: 30, height: 30 }} />}
                            color="inherit"
                            onClick={() => navigate('/')}
                        >
                            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
                                Cats Revisited
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <StyledButton active={location.pathname === '/'} color="inherit">
                                <NavLink to="/">Cats</NavLink>
                            </StyledButton>
                            <StyledButton active={location.pathname === '/breeds'}>
                                <NavLink to="/breeds">Breeds</NavLink>
                            </StyledButton>
                            <StyledButton active={location.pathname === '/favorites'}>
                                <NavLink to="/favorites">Favorites</NavLink>
                            </StyledButton>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
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
