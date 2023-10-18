import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`); // Use the 'Authorization' header
            }
            return headers;
        },
    }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Spotteds",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard",
    ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getAllSpotted: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `api/v1/spotted/getAll`,
                method: "GET",
                params: {
                    page: ++page, limit: pageSize, sort, search
                },
            }),
            providesTags: ["Spotteds"],
        }),
        postLogin: build.mutation({
            query: ({ email, password }) => ({
                url: `api/v1/auth/login`,
                method: "POST",
                body: { email, password }
            }),
            invalidatesTags: ["Login"],
            headers: { 'Content-Type': 'application/json' },
            credentials: ""
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),


        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAllSpottedQuery,
    usePostLoginMutation,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
} = api;