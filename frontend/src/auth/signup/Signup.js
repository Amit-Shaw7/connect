import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthLayout from '../../layouts/authLayout/AuthLayout';
import LogoLg from '../../components/logo/LogoLg';
import SignupForm from "./SignupForm";

const Signup = () => {

    return (
        <AuthLayout>
            <Box sx={{ position: "absolute", top: "10px", left: "10px" }}>
                <LogoLg />
            </Box>

            <SignupForm />

            <Stack spacing={2} width="70%" m="auto" my={2}>
                <Typography
                    variant="caption"
                    fontSize="0.8rem"
                    textAlign="center"
                >
                    By contiuning you agre to our term and conditions.
                </Typography>
            </Stack>
        </AuthLayout>
    )
}

export default Signup;