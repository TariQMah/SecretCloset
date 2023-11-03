import React, { useState } from "react";
import { Box, Button, Paper, useTheme } from "@mui/material";
import { useGetAllDesignerQuery, useGetAllSpottedQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Add, } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { CustomSwitch, formattedDate } from "utils/utilities";


const Image = (props) => {
    const { url } = props
    return (
        <Paper elevation={3} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={url} alt="Image" style={{ width: '150px', height: 'auto' }} />
        </Paper>
    );
};



const Designer = () => {
    const theme = useTheme();
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(0);
    const navigate = useNavigate()



    const { data, isLoading } = useGetAllDesignerQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        //search,
    });

    const quickAction = (e, type) => {
        console.log('type: ', type);
        console.log('e: ', e);
    }

    const columns = [
        {
            field: "sno",
            headerName: "ID",
            flex: 1,

        },
        {
            field: "logo",
            headerName: "Logo",
            flex: 0.5,
            renderCell: (params) => <Image url={`https://www.secretcloset.pk/uploads/${params.value}`} />,
        },
        {
            field: "category_names",
            headerName: "Categories",
            flex: 1,
        },
        {
            field: "full_name",
            headerName: "Designer",
            flex: 0.5,
        },
        {
            field: "event_name",
            headerName: "Designer Name",
            flex: 0.5,
        },
        {
            field: "contents",
            headerName: "Details",
            flex: 1,
            renderCell: (params) => <div dangerouslySetInnerHTML={{ __html: params.value }} />

        },
        {
            field: "date",
            headerName: "Date",
            flex: 0.4,
            renderCell: (params) => formattedDate(params.value)

        },

        {
            field: "stat",
            headerName: "Active",
            flex: 0.2,
            renderCell: (params) => <CustomSwitch value={params.value} onChange={(e) => quickAction(e, "isActive")} defaultChecked size="small" />

        },
        {
            field: "featured",
            headerName: "Featured",
            flex: 0.2,
            renderCell: (params) => <CustomSwitch value={params.value} onChange={(e) => quickAction(e, "isFeature")} defaultChecked size="small" />

        },
        {
            field: "home",
            headerName: "Show on home",
            flex: 0.2,
            renderCell: (params) => <CustomSwitch value={params.value} onChange={(e) => quickAction(e, "isHome")} defaultChecked size="small" />

        },
    ];




    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>

                <Header title="Designer" subtitle="List of Designer" />

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
                    getRowId={(row) => row.sno}
                    rows={(data && data?.designer) || []}
                    columns={columns}
                    rowCount={(data?.designer && data.total) || 0}
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
                        sno: false
                    }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Designer;