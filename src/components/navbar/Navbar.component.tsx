import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router';
import { DarkMode, LightMode } from '@mui/icons-material';
import Logo from '../icons/Logo.component';
import { StyledButton } from './Navbar.styled';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent={'space-between'} alignItems="center" container>
                    <Grid item>
                        <Button
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
                            <NavLink
                                to="/"
                                style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'green' })}
                            >
                                Cats
                            </NavLink>
                            <NavLink
                                to="/breeds"
                                style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'green' })}
                            >
                                Breeds
                            </NavLink>
                            <NavLink
                                to="/favorites"
                                style={({ isActive }) => (isActive ? { color: 'red' } : { color: 'green' })}
                            >
                                Favorites
                            </NavLink>

                            {/* <StyledButton
                                active={location.pathname === '/'}
                                color="inherit"
                                onClick={() => navigate('/')}
                            >
                                Cats
                            </StyledButton>
                            <StyledButton
                                active={location.pathname === '/breeds'}
                                color="inherit"
                                onClick={() => navigate('breeds')}
                            >
                                Breeds
                            </StyledButton>
                            <StyledButton
                                active={location.pathname === '/favorites'}
                                color="inherit"
                                onClick={() => navigate('favorites')}
                            >
                                Favorites
                            </StyledButton> */}
                        </Stack>
                    </Grid>

                    <Grid item>
                        <Box>
                            <IconButton color="inherit">
                                <LightMode />
                            </IconButton>
                            <IconButton>
                                <DarkMode />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
