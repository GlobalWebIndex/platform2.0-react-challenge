import React, { useState, FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { createSvgIcon } from "@mui/material/utils";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HeaderProps {
  menuItems: Array<object>;
}

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);

const TitleStyle = {
  mr: 2,
  display: { xs: "none", md: "flex" },
};

const SmallTitleStyle = { flexGrow: 1, display: { xs: "flex", md: "none" } };

const BoxStyle = { flexGrow: 1, display: { xs: "flex", md: "none" } };

const SmallBoxStyle = {
  flexGrow: 1,
  display: { xs: "none", md: "flex" },
};

const MenuStyle = {
  display: { xs: "block", md: "none" },
};

const ButtonStyle = {
  my: 2,
  color: "white",
  display: "block",
};

const ResponsiveAppBar: FC<HeaderProps> = ({ menuItems }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={TitleStyle}>
            CAT LOVERS APP
          </Typography>

          <Box sx={BoxStyle}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={MenuStyle}
            >
              {menuItems.map((menuItem: any) => (
                <Link to={menuItem.pageURL} key={menuItem.menuTitle}>
                  <MenuItem
                    key={menuItem.menuTitle}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">
                      {menuItem.menuTitle}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography variant="h6" noWrap component="div" sx={SmallTitleStyle}>
            CAT LOVERS APP
          </Typography>
          <Box sx={SmallBoxStyle}>
            {menuItems.map((menuItem: any) => (
              <Link to={menuItem.pageURL} key={menuItem.menuTitle}>
                {menuItem.menuTitle === "Home" && <HomeIcon />}
                {menuItem.menuTitle === "Cat Breeds" && <BookIcon />}
                {menuItem.menuTitle === "Favourite Cats" && <FavoriteIcon />}
                <Button
                  key={menuItem.menuTitle}
                  onClick={handleCloseNavMenu}
                  sx={ButtonStyle}
                >
                  {menuItem.menuTitle}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
