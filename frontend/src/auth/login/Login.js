import Box from "@mui/material/Box";
import LogoLg from "../../components/logo/LogoLg";
import AuthLayout from "../../layouts/authLayout/AuthLayout";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <AuthLayout>
            <Box sx={{
                position: "absolute",
                top: "10px",
                left: "10px"
            }}>
                <LogoLg />
            </Box>

            <LoginForm />
        </AuthLayout>
    )
}

export default Login;