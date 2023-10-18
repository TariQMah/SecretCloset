import React, { useState } from "react";
import { Box, Button, Paper, useTheme } from "@mui/material";
import { useGetAllSpottedQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Add, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";


const Image = (props) => {
    console.log('props: ', props);
    const { url } = props
    return (
        <Paper elevation={3} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={url} alt="Image" style={{ width: '150px', height: 'auto' }} />
        </Paper>
    );
};



const Spotted = () => {
    const theme = useTheme();
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(0);
    const navigate = useNavigate()


    const { data, isLoading } = useGetAllSpottedQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "cover",
            headerName: "Poster",
            flex: 0.5,
            renderCell: (params) => <Image url={params.value} />,
        },
        {
            field: "eventName",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "summary",
            headerName: "Details",
            flex: 1,
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        },

        {
            field: "isActive",
            headerName: "Active",
            flex: 0.4,
        },
        {
            field: "isFeatured",
            headerName: "Featured",
            flex: 1,
        },
        {
            field: "isHome",
            headerName: "Show on home",
            flex: 0.5,
        },
    ];




    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>

                <Header title="SPOTTED" subtitle="List of Spotted" />

                <Box>
                    <Button
                        onClick={() => navigate("add")}

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


                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.spotted) || []}
                    columns={columns}
                    rowCount={(data?.spotted && data.totalRecords) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    rowHeight={220}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    columnVisibilityModel={{
                        _id: false
                    }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Spotted;