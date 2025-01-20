import {ecommerceApi} from "@/redux/api";

export const fileApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        uploadFile: builder.mutation<void, {file: File}>({
            query: ({file}) => ({
                url: `v1/file`,
                method: "POST",
                body: file,
            }),
        }),

    }),
})

export const { useUploadFileMutation } = fileApi;