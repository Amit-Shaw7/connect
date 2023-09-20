import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { links } from "./navLinks";
import { Search, SearchOutlined } from "@mui/icons-material";
import Logo from "../../components/logo/Logo";

export default function DrawerNavigation({ toggleDrawer, open }) {
    const location = useLocation();
    return (
        <Drawer
            PaperProps={{style:{width:"300px"}}}
            anchor="left"
            open={open}
            onClose={() => toggleDrawer(false)}
        >
            <Box sx={{ p: 2 }}>
                <Logo visible={true} />
            </Box>
            <List>
                {
                    links?.map((item) => (
                        <Link key={item?.path} className="remove-link-style" to={item.path}>
                            <ListItemButton
                                onClick={() => toggleDrawer(false)}
                                key={item?.path}
                                selected={location.pathname === item?.path}
                            >
                                <ListItemIcon>
                                    {location.pathname === item?.path ? item?.selectedIcon : item?.icon}
                                </ListItemIcon>
                                <ListItemText primary={item?.title} />
                            </ListItemButton>
                        </Link>
                    ))
                }
                <Link className="remove-link-style" to="/search">
                    <ListItemButton
                        onClick={() => toggleDrawer(false)}
                        key="/search"
                        selected={location.pathname === "search"}
                    >
                        <ListItemIcon>
                            {location.pathname === "search" ? <Search color="primary" /> : <SearchOutlined color="primary" />}
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItemButton>
                </Link>
            </List>
        </Drawer>
    );
};