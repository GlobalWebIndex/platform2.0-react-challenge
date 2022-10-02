import React from "react";
import {
    AppBar,
    Toolbar
} from "@mui/material";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';

function NavbarComponent() {
    return (
        <AppBar position="static" id="navbar" style={{ position: "fixed", top: 0, zIndex: 100, boxShadow: "0 5px 20px -10px white" }}>
            <Toolbar>
                <Box display={"flex"} width={"100%"} justifyContent="space-between" alignItems="center">
                    <PetsIcon sx={{ color: "white" }} />

                    <Box display={"flex"}>
                        <Button component={Link} to="/photos" variant="outlined" sx={{ color: "white" }}>Photos</Button>
                        <Button component={Link} to="/breeds" sx={{ color: "white" }}>Breeds</Button>
                        <Button component={Link} to="/favourites" sx={{ color: "white" }}>Favourites</Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar >
    );
}
export default NavbarComponent;