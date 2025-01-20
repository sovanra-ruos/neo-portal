import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setAccessToken } from "@/redux/feature/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        console.log("Token", token);
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        const res = await fetch("https://neo-portal.cloudinator.cloud/api/refresh", {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            api.dispatch(setAccessToken(data.accessToken));
            result = await baseQuery(args, api, extraOptions);
        } else {
            await fetch("https://neo-portal.cloudinator.cloud/api/logout", {
                method: "POST",
                credentials: "include",
            });
        }
    }
    return result;
};

export const ecommerceApi = createApi({
    reducerPath: "ecommerceApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
});