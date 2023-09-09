import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import ArrowLeftOutlined from "@mui/icons-material/ArrowLeftOutlined";
import Menu from "@mui/icons-material/Menu";
import useResponsive from "../../hooks/usResponsive";
import Logo from "../../components/logo/Logo";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";
import Search from "../../components/search";
import SearchIcon from "@mui/icons-material/Search";
import UserListMenu from "./UserListMenu";
import { useNavigate } from "react-router-dom";
import DrawerNavigation from "../navigation/DrawerNavigation";

const Header = ({ openDrawer , toggleDrawer, handleDrawerOpen, handleOpenSearch }) => {
    const { user } = useSelector(state => state.user);

    const isDesktop = useResponsive("up", "md");
    const navigate = useNavigate();

    const [openMenu, setAnchorElUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [openSearch, setOpenSearch] = useState(users?.length > 0);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const goTooSearchPage = () => {
        navigate("/search");
    }


    return (
        <Stack sx={{ position: "relative" }}>
            <AppBar sx={{ height: "max-content", px: 1 }} color='inherit' component="nav">
                <Toolbar sx={{ boxShadow: "none", justifyContent: "space-between" }}>
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
                            onClick={handleOpenSearch}
                        >

                            {
                                isDesktop
                                    ?
                                    <Search setUsers={setUsers} />
                                    :
                                    <IconButton onClick={goTooSearchPage} size="medium">
                                        <SearchIcon color='primary' />
                                    </IconButton>
                            }
                        </Box>
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

                        <UserMenu handleCloseUserMenu={handleCloseUserMenu} openMenu={openMenu} />
                    </Stack>
                </Toolbar>
            </AppBar>
            <DrawerNavigation open={openDrawer} toggleDrawer={toggleDrawer}/>
        </Stack>
    )
}

export default Header;