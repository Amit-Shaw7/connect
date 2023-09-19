import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/icons-material/Menu";
import useResponsive from "../../hooks/usResponsive";
import Logo from "../../components/logo/Logo";
import UserMenu from "./UserMenu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import DrawerNavigation from "../navigation/DrawerNavigation";
import SearchUserMenu from "../../components/Autocomplete";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../store/actions/AppAction";

const Header = ({ openDrawer, toggleDrawer, user }) => {

    const { mode } = useSelector(state => state.app);
    const isDesktop = useResponsive("up", "md");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openMenu, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const goTooSearchPage = () => {
        navigate("/search");
    }

    const handleMode = () => {
        dispatch(toggleMode(mode));
    }


    return (
        <Stack bgcolor="background.default">
            <AppBar enableColorOnDark={true} variant="elevation" sx={{ height: "max-content", px: 1 }} color="inherit" component="nav">
                <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
                    <Stack flexDirection="row" alignItems="center">
                        {!isDesktop && <IconButton
                            onClick={() => toggleDrawer(true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>}


                        <Logo />
                    </Stack>

                    <Stack flexDirection="row" alignItems="center" px={2} position="relative">
                        <Box
                            aria-label="search users list"
                            aria-controls=""
                            aria-haspopup="true"
                        >

                            {
                                isDesktop
                                    ?
                                    <Box>
                                        <SearchUserMenu />
                                    </Box>
                                    :
                                    <IconButton onClick={goTooSearchPage} size="medium">
                                        <SearchIcon color="primary" />
                                    </IconButton>
                            }
                        </Box>
                        <IconButton onClick={handleMode}>
                            {mode === "light" ? <DarkMode /> : <LightMode />}
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls=""
                            aria-haspopup="true"
                            onClick={handleOpenUserMenu}
                            color="inherit"
                        >
                            <Avatar
                                src={user?.avatar}
                                alt={user?.name}
                                sx={{
                                    height: "36px",
                                    width: "36px"
                                }}
                            >
                                {user?.avatar ? "" : user?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>

                        <UserMenu user={user} handleCloseUserMenu={handleCloseUserMenu} openMenu={openMenu} />
                        {/* <UserListMenu users={users} openSearchMenu={openSearchMenu} handleCloseSearch={handleCloseSearchMenu} /> */}
                    </Stack>
                </Toolbar>
            </AppBar>
            <DrawerNavigation open={openDrawer} toggleDrawer={toggleDrawer} />
        </Stack>
    )
}

export default Header;