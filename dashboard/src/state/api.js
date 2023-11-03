import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = { 'Content-Type': 'application/json' };


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
        "SpottedCategories",
        "Spotteds",
        "Spotteds",
        "Dashboard",
    ],
    endpoints: (build) => ({


        getAllSpottedCategories: build.query({
            query: () => ({
                url: `api/v1/spotted/getCategories`,
                method: "GET",
                providesTags: ["SpottedCategories"],
            }),
            providesTags: ["SpottedCategories"],
        }),

        getAllSpotted: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `api/v1/spotted`,
                method: "GET",
                params: {
                    perPage: pageSize, page: ++page, sort, search
                },
            }),
            providesTags: ["Spotteds"],
        }),

        getAllDesigner: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: `api/v1/designer`,
                method: "GET",
                params: {
                    perPage: pageSize, page: ++page, sort, search
                },
            }),
            providesTags: ["designers"],
        }),


        postLogin: build.mutation({
            query: ({ user, password }) => ({
                url: `api/v1/auth/login`,
                method: "POST",
                body: { user, password }
            }),
            invalidatesTags: ["Login"],
            headers,
            credentials: ""
        }),

        postCreateSpotted: build.mutation({
            query: ({ category, cover, details, eventName, isActive, isFeature, isHome, order, title }) => ({
                url: `api/v1/spotted/create`,
                method: "POST",
                body: { category, image: cover[0], details, eventName, isActive, isFeature, isHome, order: parseInt(order), title }
            }),
            invalidatesTags: ["CreateSpotted"],
            headers,
        }),





    }),
});

export const {
    useGetUserQuery,
    useGetAllSpottedCategoriesQuery,
    useGetAllSpottedQuery,
    useGetCustomersQuery,
    useGetAllDesignerQuery,



    usePostLoginMutation,
    usePostCreateSpottedMutation,

} = api;