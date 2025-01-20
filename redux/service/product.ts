import {ecommerceApi} from "@/redux/api";

export const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query<void, {page:number , size:number}>({
            query: ({page, size}) => ({
                url: `v1/product?page=${page}&size=${size}`,
                method: "GET",
            }),
        }),

        createProduct: builder.mutation<void, {name: string,price:number,description:string,categoryName:string,image:string}>({
            query: ({name,price,description,categoryName,image}) => ({
                url: `v1/product`,
                method: "POST",
                body: {name,price,description,categoryName,image},
            }),
        }),

    }),
})

export const { useGetProductsQuery ,useCreateProductMutation} = productApi;
