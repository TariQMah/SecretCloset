import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
    Email,
    VpnKey,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    TextField,
} from "@mui/material";
import { usePostLoginMutation } from "state/api";
import { useNavigate } from "react-router-dom";
import { login } from "state/auth";
import { useDispatch } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [postLogin, { isLoading, isError, isSuccess }] = usePostLoginMutation(); // Use the mutation hook
    const navigate = useNavigate();

    const onSubmit = (data) => {
        postLogin(data).unwrap().then(async (response) => {
            if (response.token) {
                await localStorage.setItem("token", response.token);
                dispatch(login(response))
                navigate("/dashboard");
            }
        }).catch((err) => console.log("Error", err));
    };


    return (
        <Box m="1.5rem 2.5rem">

            <Box display={"flex"} height={"90vh"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Box>Admin
                </Box>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box mt={3} width={400}>
                            <Controller
                                name="user"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && (
                                <Typography variant="body2" color="error" mt={1}>
                                    {errors.email.message}
                                </Typography>
                            )}
                        </Box>
                        <Box mt={3}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <TextField
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        variant="outlined"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password && (
                                <Typography variant="body2" color="error" mt={1}>
                                    {errors.password.message}
                                </Typography>
                            )}
                        </Box>
                        <Box mt={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {isLoading ? "Logging in..." : "Login"}

                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;