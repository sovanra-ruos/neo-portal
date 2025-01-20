import {ecommerceApi} from "@/redux/api";

export const inventoryApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        getInventory: builder.query<void, { page: number, size: number }>({
            query: ({ page, size }) => ({
                url: `v1/inventory?page=${page}&size=${size}`,
                method: "GET",
            }),
        }),

        createInventoryItem: builder.mutation<void, { productName: string, qty: number }>({
            query: ({ productName, qty }) => ({
                url: `v1/inventory`,
                method: "POST",
                body: { productName, qty },
            }),
        }),

        getInventoryByUuid: builder.query<void, { uuid: string }>({
            query: ({ uuid }) => ({
                url: `v1/inventory/${uuid}`,
                method: "GET",
            }),
        }),

        getInventoryByCategoryName: builder.query<void, { categoryName: string }>({
            query: ({ categoryName }) => ({
                url: `v1/inventory/category/${categoryName}`,
                method: "GET",
            }),
        }),

    }),
})


export const { useGetInventoryQuery, useCreateInventoryItemMutation,useGetInventoryByUuidQuery,useGetInventoryByCategoryNameQuery } = inventoryApi;