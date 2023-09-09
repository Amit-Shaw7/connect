import React from 'react';
import useResponsive from '../../hooks/usResponsive';
import LogoLg from './LogoLg';
import LogoSm from './LogoSm';

const Logo = ({visible}) => {
    const isMobile = useResponsive("up", "sm");
    return (
        <>
            {(isMobile || visible) && <LogoLg />}
        </>
    )
}

export default Logo