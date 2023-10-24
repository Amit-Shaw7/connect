import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/Visibility";
import signupSchema from "../../schema/SignupSchema";
import { signupFn } from "../../store/actions/AuthActions";

const SignupForm = () => {
    const { loading } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowCPassword((show) => !show);

    const defaultValues = {
        name: "",
        email: "",
        username: "",
        phone: "",
        password: ""
    }

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isLoading,
        }
    } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues
    });

    const onSubmit = (data) => {
        dispatch(signupFn(data, setErrorMsg, navigate));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width="70%" m="auto">
                <Box>
                    <Typography
                        variant="subtitle1"
                    >
                        Already a user ?
                        <Link
                            className="remove-link-style"
                            component={RouterLink}
                            to="/login">
                            Login
                        </Link>
                    </Typography>
                </Box>

                <TextField
                    variant="filled"
                    size="small"
                    type="text"
                    name="name"
                    label="Name"
                    {...register("name")}
                    error={errors.name && true}
                    helperText={errors.name?.message}
                />

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

                <TextField
                    variant="filled"
                    size="small"
                    type="text"
                    name="username"
                    label="Username"
                    {...register("username")}
                    error={errors.username && true}
                    helperText={errors.username?.message}
                />

                <TextField
                    variant="filled"
                    size="small"
                    type="number"
                    name="phone"
                    label="Phone"
                    {...register("phone")}
                    error={errors.phone && true}
                    helperText={errors.phone?.message}
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

                <Stack position="relative">
                    <TextField
                        variant="filled"
                        size="small"
                        type={showCPassword ? "text" : "password"}
                        name="confirmPassword"
                        label="Confirm Password"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword && true}
                        helperText={errors.confirmPassword?.message}
                    />

                    <IconButton
                        sx={{
                            position: "absolute",
                            right: "10px",
                            top: "10px"
                        }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                    >
                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </Stack>


                <Typography
                    variant="caption"
                    textAlign="center"
                    color="red"
                >
                    {errorMsg && errorMsg}
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || isLoading}
                >
                    {(isSubmitting || isLoading) ? <CircularProgress color="inherit" size="26px" /> : "Submit"}
                </Button>

            </Stack>
        </form>
    )
}

export default SignupForm;