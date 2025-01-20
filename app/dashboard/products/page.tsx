"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/component/dashboard/dashboard-layout"
import { useGetCategoriesQuery } from "@/redux/service/category"
import { useUploadFileMutation } from "@/redux/service/file"
import {useCreateProductMutation, useGetProductsQuery} from "@/redux/service/product"

export type ProductResponse = {
    next: boolean
    previous: boolean
    total: number
    totalElements: number
    results: Product[]
}

type Product = {
    uuid: string
    name: string
    price: number
    categoryName: string
    image: string
    description: string
}

interface CategorySelectProps {
    categories: { uuid: string, name: string }[]
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, value, onChange }) => {
    return (
        <select
            name="categoryName"
            value={value}
            onChange={onChange}
            className="border rounded p-2"
        >
            <option value="">Select Category</option>
            {categories.map(category => (
                <option key={category.uuid} value={category.name}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}

export default function ProductsPage() {
    const [file, setFile] = useState<File | null>(null)
    const [upload] = useUploadFileMutation()
    const [createProduct] = useCreateProductMutation()

    const {data} = useGetProductsQuery({page: 0, size: 10}) as {data: ProductResponse}

    const products = data?.results || []

    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: "",
        price: 0,
        categoryName: "",
        description: "",
        image: ""
    })

    const { data: categoryData } = useGetCategoriesQuery({ page: 0, size: 10 }) as { data: { results: { uuid: string, name: string }[] } }

    const categories = categoryData?.results || []

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewProduct(prev => ({ ...prev, [name]: name === "price" ? parseFloat(value) : value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        setFile(file ?? null)

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewProduct(prev => ({ ...prev, image: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddProduct = async () => {
        try {
            let uploadedFile = file

            // Upload the file if not already uploaded
            if (!file) {
                // @ts-expect-error: uploadFile expects a non-null file
                uploadedFile = await upload(file)

                console.log("File uploaded:", uploadedFile)
            }

            const product = await createProduct({
                name: newProduct?.name || "",
                price: newProduct?.price || 0,
                categoryName: newProduct?.categoryName || "",
                description: newProduct?.description || "",
                image: `https://neo-store.cloudinator.cloud/images/${uploadedFile?.name}`,
            })

            console.log("Product created:", product)

        } catch (error) {
            console.error("Error adding product:", error)
        }
    }

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                        name="name"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                    />
                    <CategorySelect
                        categories={categories}
                        value={newProduct?.categoryName || ""}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="description"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <Button onClick={handleAddProduct}>Add Product</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.uuid}>
                                <TableCell>
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md"
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.categoryName}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    )
}