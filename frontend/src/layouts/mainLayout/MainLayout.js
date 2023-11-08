import { Outlet, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../header/Header";
import Navigation from "../navigation";
import Content from "./Content";
import Suggestions from "./Suggestions";
import { useEffect, useState } from "react";
import useResponsive from "../../hooks/usResponsive";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFn } from "../../store/actions/UserActions";

const getUser = (dispatch, navigate) => {
    dispatch(loadUserFn(navigate));
};

export default function MainLayout() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openDrawer, setOpenDrawer] = useState(false);
    const isDesktop = useResponsive("up", "md");

    const toggleDrawer = (val) => {
        setOpenDrawer(val)
    }

    useEffect(() => {
        getUser(dispatch, navigate);
    }, [dispatch , navigate]);

    return (
        <Stack width='100%'>
            <Header openDrawer={openDrawer} toggleDrawer={toggleDrawer} user={user} />
            <Stack
                sx={{
                    width: "100%",
                    height: "90vh",
                    mt: "60px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    px: { lg: 12, md: 0, sm: 6, xs: 0 },
                }}
            >
                <Navigation />

                <Content>
                    <Outlet />
                </Content>

                {isDesktop && <Suggestions />}
            </Stack>
        </Stack>
    );
}