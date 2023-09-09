import React from 'react'
import CustomContainer from '../../components/customContainer/CustomContainer'
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

const Page404 = () => {
    return (
        <CustomContainer>
            <Stack
                alignItems="center"
                justifyContent="center"
                height="80vh"
                width="100%"
            >
                <Typography variant='h2'>404! Error</Typography>
                <Typography>Page not found</Typography>
                <Link component={RouterLink} to="/">Go to home</Link>
            </Stack>
        </CustomContainer>
    )
}

export default Page404