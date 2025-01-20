import {ecommerceApi} from "@/redux/api";

export const userApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        getMe: builder.query<void, void>({
            query: () => ({
                url: `v1/user/me`,
                method: "GET",
            }),
        }),

    }),
})

export const { useGetMeQuery } = userApi;