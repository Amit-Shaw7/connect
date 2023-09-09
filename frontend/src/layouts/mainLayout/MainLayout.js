import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../header";
import Navigation from "../navigation";
import Content from "./Content";
import Suggestions from "./Suggestions";
import UserListMenu from "../header/UserListMenu";
import { useState } from "react";
import { Drawer } from "@mui/material";

export default function MainLayout() {
    const [users, setUsers] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleCloseSearch = () => {
        setOpenSearch(false);
    }
    const handleOpenSearch = () => {
        setOpenSearch(true);
    }

    const toggleDrawer = (val) => {
        setOpenDrawer(val)
    }
    return (
        <Box sx={{ display: 'flex', height: "100vh" }}>
            <Header openDrawer={openDrawer} toggleDrawer={toggleDrawer} setUsers={setUsers} handleOpenSearch={handleOpenSearch} />
            {/* <UserListMenu users={users} openSearch={openSearch} handleCloseSearch={handleCloseSearch} /> */}
            <Box sx={{ flexGrow: 1, mt: 9 }}>
                <Stack flexDirection="row" justifyContent="space-between">
                    <Stack sx={{ flex: { xs: 0, sm: 0, md: 2.5, lg: 2.5 } }}>
                        <Navigation />
                    </Stack>

                    <Stack sx={{ flex: { xs: 12, sm: 12, md: 5, lg: 6.5 } }}>
                        <Content>
                            <Outlet />
                        </Content>
                    </Stack>

                    <Stack sx={{ flex: { xs: 0, sm: 0, md: 3.5, lg: 3 } }}>
                        <Suggestions />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}