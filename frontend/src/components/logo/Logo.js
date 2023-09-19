import React from "react";
import useResponsive from "../../hooks/usResponsive";
import LogoLg from "./LogoLg";

const Logo = ({visible}) => {
    const isMobile = useResponsive("up", "sm");
    return (
        <>
            {(isMobile || visible) && <LogoLg />}
        </>
    )
}

export default Logo;