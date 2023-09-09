import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { logoutFn } from "../../store/actions/AuthActions";

const UserMenu = ({ openMenu, handleCloseUserMenu }) => {
    const { userId } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutFn(navigate));
        handleCloseUserMenu();
    }
    const goToDashboard = () => {
        navigate("/dashboard");
    }
    const goToProfile = () => {
        navigate(`/user/${userId}`);
    }

    return (
        <Menu
            sx={{
                mt: "45px",
            }}
            id="menu-appbar"
            anchorEl={openMenu}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={goToProfile}>
                <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={goToDashboard}>
                <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
    )
}

export default UserMenu;