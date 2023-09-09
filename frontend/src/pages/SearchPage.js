import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../components/logo/Logo';
import Search from '../components/search/Search';
import { Stack } from '@mui/material';
import UserList from '../layouts/mainLayout/UserList';
import DrawerNavigation from '../layouts/navigation/DrawerNavigation';



export default function SearchPage() {
    const [users, setUsers] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = (val) => {
        setOpenDrawer(val);
    }
    return (
        <>
            <Box sx={{ flexGrow: 1, width: "100vw" }}>
                <AppBar sx={{ height: "max-content", px: 1 }} color='inherit' component="nav">
                    <Toolbar sx={{ width: "100%" }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={() => toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ width: "90%" }}>
                            <Search setUsers={setUsers} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Stack mt={8}>
                <UserList users={users} type="Users" />
            </Stack>

            <DrawerNavigation toggleDrawer={toggleDrawer} open={openDrawer}/>
        </>
    );
}
