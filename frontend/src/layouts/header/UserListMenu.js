import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import UserList from "../mainLayout/UserList";
import { Box, Card, Popover, Stack } from "@mui/material";
const UserListMenu = ({ users , openSearch , handleCloseSearch}) => {
    return (
        <Menu
            sx={{
                height: "max-content",
                width: "400px",
                top: "60px",
                right: "20px",
                position: "absolute",
                zIndex: 5,
                py:2
            }}
            open={openSearch}
            onClose={handleCloseSearch}
        >
            <UserList type="User" users={users} />
        </Menu>)
}

export default UserListMenu