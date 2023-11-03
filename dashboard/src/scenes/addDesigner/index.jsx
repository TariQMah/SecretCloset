import React from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import { ArrowBack } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { usePostLoginMutation } from "state/api";



const AddDesigner = () => {
    const theme = useTheme();



    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [postLogin, { isLoading, isError, isSuccess }] = usePostLoginMutation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // postLogin(data).unwrap().then(async (response) => {
        //     if (response.token) {
        //         await localStorage.setItem("token", response.token);
        //         dispatch(login(response))
        //         navigate("/dashboard");
        //     }
        // }).catch((err) => console.log("Error", err));
    };

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>

                <Header title="ADD Designer" subtitle="Add New Designer" />

                <Box>
                    <Button
                        onClick={() => navigate("/designer")}

                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <ArrowBack sx={{ mr: "10px" }} />
                        Back
                    </Button>
                </Box>

            </FlexBetween>
            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FlexBetween gap={5}>

                        <Box mt={3} width={"100%"}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Title Name"
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
                        <Box mt={3} width={"100%"}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Title Name"
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
                        <Box mt={3} width={"100%"}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Title Name"
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
                    </FlexBetween>


                    <FlexBetween gap={5}>

                        <Box mt={3} width={"100%"}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Title Name"
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
                        <Box mt={3} width={"100%"}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Title Name"
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
                        <Box mt={3} width={"100%"}>
                            <Controller
                                name="title"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "User is required",

                                }}
                                render={({ field }) => (
                                    <TextField
                                        label="Title Name"
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
                    </FlexBetween>


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
    );
};

export default AddDesigner;