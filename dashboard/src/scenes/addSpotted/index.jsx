import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { Add, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";



const AddSpotted = () => {
    const theme = useTheme();

    const navigate = useNavigate()

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>

                <Header title="ADD SPOTTED" subtitle="Add New Spotted" />

                <Box>
                    <Button
                        onClick={() => navigate("/spotted/add")}

                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <Add sx={{ mr: "10px" }} />
                        Add New
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



            </Box>
        </Box>
    );
};

export default AddSpotted;