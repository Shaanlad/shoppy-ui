"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import PortraitIcon from '@mui/icons-material/Portrait';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../auth/auth-context";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { routes, unauthenticatedRoutes } from "../common/constants/routes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import getProducts from "../products/actions/get-products";
import { Product } from "../products/interfaces/product.interface";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface HeaderProps {
    logout: () => Promise<void>;
}

export default function Header({ logout }: HeaderProps) {

    const isAuthenticated = useContext(AuthContext);
    const router = useRouter();
    const searchParams = useSearchParams();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = isAuthenticated ? routes: unauthenticatedRoutes;

  return (
     <AppBar position="static" sx={{ bgcolor: "#0f3359" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <ShoppingBasketIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          /> */}
          <LocalMallIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            BuyNow
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => {
                    router.push(page.path);
                    handleCloseNavMenu();
                }}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalMallIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BuyNow
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                    router.push(page.path);
                    handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center", mx: 2 }}>
            <Autocomplete
              freeSolo
              size="small"
              sx={{ width: "100%", maxWidth: 400 }}
              options={products}
              getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
              filterOptions={(options, { inputValue }) =>
                inputValue
                  ? options.filter((option) =>
                      option.name.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  : []
              }
              inputValue={search}
              onInputChange={(_, value) => setSearch(value)}
              onChange={(_, value) => {
                if (value && typeof value !== "string") {
                  router.push(`/products/${value.id}`);
                  setSearch("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search BuyNow"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: 1,
                    input: { color: "#fff" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": { color: "#fff" },
                  }}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#fff" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Box>

          {isAuthenticated && <Settings logout={logout}/>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const Settings = ({logout} : HeaderProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <Box
          onClick={handleOpenUserMenu}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Person" sx={{ bgcolor: "#fff", color: "#000" }}>
              <PortraitIcon sx={{ width: "70%", height: "70%" }} />
            </Avatar>
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        
        <MenuItem key="Logout" onClick={async () => {
            await logout();
            handleCloseUserMenu();
        }}>
        <Typography textAlign="center">Logout</Typography>
        </MenuItem>

      </Menu>
    </Box>
  );
};