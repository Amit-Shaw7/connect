import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import UserList from "../mainLayout/UserList";
import { Box, Card, Popover, Stack } from "@mui/material";
const UserListMenu = ({ users, openSearchMenu, handleCloseSearch }) => {
    const open = Boolean(openSearchMenu);
    return (
        <Popover
            anchorEl={openSearchMenu}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={open}
            onClose={handleCloseSearch}
        >
            {
                users?.length === 0
                    ?
                    <Typography>No Users</Typography>
                    :
                    <UserList type="User" users={users} />
            }

        </Popover>
    )
}

export default UserListMenu