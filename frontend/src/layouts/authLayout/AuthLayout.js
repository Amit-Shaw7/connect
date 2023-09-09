import React from 'react';
import { Stack, Box } from '@mui/material';
import Image from '../../components/image/Image';
import useResponsive from '../../hooks/usResponsive';

const LoginLayout = ({ children }) => {
    const isScreenBig = useResponsive("up", "lg");
    return (
        <Stack
            height="100vh"
            width="100%"
            justifyContent={isScreenBig ? "space-around" : "center"}
            alignItems="center"
            flexDirection="row"
        >
            {isScreenBig && <Box sx={{ mx: 4}}>
                <Image
                    src="/assets/auth/login-display.jpg"
                    height="max-content"
                    width="700px"
                />
            </Box>}

            <Stack sx={{ width: "500px" }}>
                {children}
            </Stack>
        </Stack>
    )
}

export default LoginLayout