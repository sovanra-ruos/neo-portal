"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import DashboardLayout from "@/component/dashboard/dashboard-layout"
import { Label } from "@/components/ui/label"
import {useUploadFileMutation} from "@/redux/service/file";
import {useCreateCategoryMutation, useGetCategoriesQuery} from "@/redux/service/category";

type Category = {
    uuid:string,
    name:string,
    image:string
}

export type CategoryResponse = {
    next: boolean;
    previous: boolean;
    total: number;
    totalElements: number;
    results: Category[];
}

export default function CategoriesPage() {

    const [file, setFile] = useState<File | null>(null)

    const [uploadFile] = useUploadFileMutation()
    const [createCategory] = useCreateCategoryMutation()

    const { data, refetch } = useGetCategoriesQuery({ page: 0, size: 10 }) as {
        data: CategoryResponse | undefined;
        refetch: () => void;
    };


    const categories = data?.results;

    const [newCategory, setNewCategory] = useState<Partial<Category>>({
        name: "",
        image: "",
    })


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target
        if (name === "image" && files && files[0]) {
            setFile(files[0])
            const reader = new FileReader()
            reader.onload = (e) => {
                setNewCategory((prev) => ({ ...prev, [name]: e.target?.result as string }))
            }
            reader.readAsDataURL(files[0])
        } else {
            setNewCategory((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleAddCategory = async () => {
        try {
            let uploadedFile = file;

            // Upload the file if not already uploaded
            if (!file) {
                // @ts-expect-error: uploadFile expects a non-null file
                uploadedFile = await uploadFile(file);

                console.log("File uploaded:", uploadedFile);
            }
            console.log("Uploaded File:", uploadedFile);

            // Create the category
            const category = await createCategory({
                name: newCategory?.name || "",
                image: `https://neo-store.cloudinator.cloud/images/${uploadedFile?.name}`,
            });

            refetch()

            console.log("Category created:", category);
        } catch (error) {
            console.error("Error adding category:", error);
            // Add UI feedback or additional error handling here
        }
    };




    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="image">Category Image</Label>
                        <Input id="image" name="image" type="file" accept="image/*" onChange={handleInputChange} />
                    </div>
                </div>
                <Button onClick={handleAddCategory}>Add Category</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories?.map((category) => (
                            <TableRow key={category.uuid}>
                                <TableCell>
                                    <Image
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name || "Category image"}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />

                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    )
}

