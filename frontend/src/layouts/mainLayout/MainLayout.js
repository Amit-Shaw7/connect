import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Header from "../header";
import Navigation from "../navigation";
import Content from "./Content";
import Suggestions from "./Suggestions";
import { useState } from "react";
import Stories from "../../components/story/Stories";
import useResponsive from "../../hooks/usResponsive";

export default function MainLayout() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const isDesktop = useResponsive("up", "md");

    const toggleDrawer = (val) => {
        setOpenDrawer(val)
    }
    return (
        <Stack width='100%'>
            <Header openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
            <Stack sx={{width:"100%", height: "90vh", mt: "70px",  flexDirection: "row" }}>
                <Navigation />

                <Content>
                    <Outlet />
                </Content>

               { isDesktop && <Suggestions />}
            </Stack>
        </Stack>
    );
}