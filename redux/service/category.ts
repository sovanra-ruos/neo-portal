import {ecommerceApi} from "@/redux/api";

export const categoryApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        getCategories: builder.query<void, {page:number , size:number}>({
            query: ({page, size}) => ({
                url: `v1/category?page=${page}&size=${size}`,
                method: "GET",
            }),
        }),

        createCategory: builder.mutation<void, {name: string,image:string}>({
            query: ({name,image}) => ({
                url: `v1/category`,
                method: "POST",
                body: {name,image},
            }),
        }),

    }),
})

export const { useGetCategoriesQuery ,useCreateCategoryMutation} = categoryApi;