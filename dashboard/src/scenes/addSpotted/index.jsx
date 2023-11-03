import React from "react";
import { Autocomplete, Box, Button, FormLabel, InputLabel, MenuItem, Select, TextField, Typography, useTheme, } from "@mui/material";
import Header from "components/Header";


import { ArrowBack } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { usePostCreateSpottedMutation, usePostLoginMutation } from "state/api";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { CustomSwitch } from "utils/utilities";
import { green } from "@mui/material/colors";




const AddSpotted = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const { control, watch, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const files = watch('cover') || []
    const [postCreateSpotted, { isLoading, isError, isSuccess }] = usePostCreateSpottedMutation(); // Use the mutation hook
    const navigate = useNavigate();

    const { spottedCategories } = useSelector((state) => state.commons); // Get the state

    //title, date, category, event_name, details, image, ord, home, featured, stat

    const onSubmit = (data) => {
        postCreateSpotted(data).unwrap().then(async (response) => {
            console.log('response: ', response);
            // if (response.token) {
            //     await localStorage.setItem("token", response.token);
            //     dispatch(login(response))
            //     navigate("/dashboard");
            // }
        }).catch((err) => console.log("Error", err));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                postCreateSpotted({
                    ...watch(),
                    cover: base64String,
                });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleReset = () => {
        reset();

    }

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="Add Spotted" subtitle="Add New Spotted" />
                <Box>
                    <Button
                        onClick={() => navigate("/spotted")}

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

                <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                    <FlexBetween gap={5} sx={{ alignItems: "start" }}>
                        <Box width={"100%"}>
                            <FlexBetween gap={5} >

                                <Box width={"100%"}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Title is required",

                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                label="Title"
                                                fullWidth
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.title && (
                                        <Typography variant="body2" color="error" mt={1}>
                                            {errors.title.message}
                                        </Typography>
                                    )}
                                </Box>
                                <Box width={"100%"}>
                                    <Controller
                                        name="eventName"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Event name is required",

                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                label="Event Name"
                                                fullWidth
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.eventName && (
                                        <Typography variant="body2" color="error" mt={1}>
                                            {errors.eventName.message}
                                        </Typography>
                                    )}
                                </Box>


                            </FlexBetween>
                            <FlexBetween gap={5}>
                                <Box mt={3} width={"100%"}>
                                    <Controller
                                        name="category"
                                        control={control}
                                        getOptionLabel={(option) => option.id}
                                        rules={{
                                            required: "Category is required",
                                        }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                fullWidth
                                                {...field}
                                                options={spottedCategories?.map(item => ({ label: item?.title, id: `${item.sno}` }))}
                                                renderInput={(params) => <TextField fullWidth  {...params} label="Category" />}
                                            />

                                        )}
                                    />
                                    {errors.category && (
                                        <Typography variant="body2" color="error" mt={1}>
                                            {errors.category.message}
                                        </Typography>
                                    )}
                                </Box>
                                <Box mt={3} width={"100%"}>
                                    <Controller
                                        name="order"
                                        control={control}
                                        defaultValue=""

                                        render={({ field }) => (
                                            <TextField
                                                label="Order"
                                                fullWidth
                                                variant="outlined"
                                                type="number"
                                                {...field}
                                            />
                                        )}
                                    />

                                </Box>


                            </FlexBetween>

                            <FlexBetween gap={5}>
                                <Box mt={3} width={"100%"}>
                                    <Controller
                                        name="details"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Details is required",
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                label="Details"
                                                fullWidth
                                                multiline  // Add multiline attribute for a textarea
                                                minRows={5}  // Set the minimum number of rows
                                                variant="outlined"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.details && (
                                        <Typography variant="body2" color="error" mt={1}>
                                            {errors.details.message}
                                        </Typography>
                                    )}
                                </Box>
                            </FlexBetween>



                        </Box>
                        <Box width={"60%"}>
                            <Box width={"100%"} display={"flex"} height={"100%"} alignSelf={"flex-start"}>
                                <Controller
                                    name="cover"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Spotted cover is required",

                                    }}
                                    render={({ field }) => (

                                        <Dropzone accept="image/*"
                                            maxFileSize={5230000}
                                            maxFiles={1}
                                            onChange={handleFileChange}
                                            {...field} value={files}>
                                            {files?.map((file) => (
                                                <FileMosaic {...file} preview />
                                            ))}
                                        </Dropzone>

                                    )}
                                />
                                {errors.cover && (
                                    <Typography variant="body2" color="error" mt={1}>
                                        {errors.cover.message}
                                    </Typography>
                                )}
                            </Box>

                            <FlexBetween >
                                <Box mt={3} width={"100%"} textAlign={"center"}>
                                    <FormLabel component="legend">Show on home</FormLabel>

                                    <Controller
                                        name="isHome"
                                        control={control}
                                        defaultValue="Y"
                                        render={({ field }) => (
                                            <CustomSwitch variant={green[600]} value={"Y"} {...field} defaultChecked />
                                        )}
                                    />

                                </Box>
                                <Box mt={3} width={"100%"} textAlign={"center"}>
                                    <FormLabel component="legend">Show on feature</FormLabel>

                                    <Controller
                                        name="isFeature"
                                        control={control}
                                        label="Adssa"
                                        defaultValue="Y"
                                        render={({ field }) => (

                                            <CustomSwitch variant={green[600]} value={"Y"} {...field} onChange={(e) => console.log(e, "isFeature")} defaultChecked />
                                        )}
                                    />

                                </Box>
                                <Box mt={3} width={"100%"} textAlign={"center"}>
                                    <FormLabel component="legend">Is Active</FormLabel>

                                    <Controller
                                        name="isActive"
                                        control={control}
                                        defaultValue="Y"
                                        render={({ field }) => (

                                            <CustomSwitch variant={green[600]} {...field} onChange={(e) => console.log(e, "isActive")} defaultChecked />
                                        )}
                                    />

                                </Box>
                            </FlexBetween>
                        </Box>
                    </FlexBetween>



                    <Box mt={3} display={"flex"} gap={5}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"

                            color="primary"
                            fullWidth
                        >
                            {isLoading ? "Logging in..." : "Add"}

                        </Button>

                        <Button
                            type="reset"
                            size="large"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleReset}
                        >
                            Reset

                        </Button>
                    </Box>
                </form>

            </Box>
        </Box>
    );
};

export default AddSpotted;