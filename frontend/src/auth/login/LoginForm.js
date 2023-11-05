import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import loginSchema from "../../schema/LoginSchema";
import { loginAsGuestFn, loginFn } from "../../store/actions/AuthActions";
import { formatErrorMessage } from "../../utils/formatError";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const defaultValues = {
        email: "",
        password: ""
    };

    const { register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isLoading,
        }
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues,
    });

    const onSubmit = (data) => {
        dispatch(loginFn(data, setErrorMsg, navigate));
    };

    const loginAsGuest = () => {
        dispatch(loginAsGuestFn(setErrorMsg , navigate));
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                spacing={2}
                width="70%"
                m="auto"
            >
                <Box>
                    <Typography variant="subtitle1">
                        Are you a new user ?
                        <Link
                            className="remove-link-style"
                            component={RouterLink}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </Typography>
                </Box>

                <TextField
                    variant="filled"
                    size="small"
                    type="email"
                    name="email"
                    label="Email"
                    {...register("email")}
                    error={errors.email && true}
                    helperText={errors.email?.message}
                />

                <Stack position="relative">
                    <TextField
                        variant="filled"
                        size="small"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        {...register("password")}
                        error={errors.password && true}
                        helperText={errors.password?.message}
                    />

                    <IconButton
                        sx={{
                            position: "absolute",
                            right: "10px",
                            top: "10px"
                        }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </Stack>

                <Typography
                    variant="caption"
                    textAlign="center"
                    color="red"
                >
                    {errorMsg && formatErrorMessage(errorMsg)}
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || isLoading}
                >
                    {(isSubmitting || isLoading) ? <CircularProgress color="inherit" size="26px" /> : "Submit"}
                </Button>

                <Typography textAlign='center' variant="subtitle1">
                    OR
                </Typography>

                <Button
                    type="button"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || isLoading}
                    onClick={loginAsGuest}
                >
                    {(isSubmitting || isLoading) ? <CircularProgress color="inherit" size="26px" /> : "Login as guest"}
                </Button>
            </Stack>
        </form>
    )
}

export default LoginForm;