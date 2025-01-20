"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import DashboardLayout from "@/component/dashboard/dashboard-layout";
import {useGetProductsQuery} from "@/redux/service/product";
import {ProductResponse} from "@/app/dashboard/products/page";
import {useCreateInventoryItemMutation, useGetInventoryQuery} from "@/redux/service/inventory";



export type InventoryResponse = {
    next: boolean
    previous: boolean
    total: number
    totalElements: number
    results: InventoryType[]
}


export type InventoryType = {
    uuid: string;
    qty: number;
    product: {
        uuid: string;
        name: string;
        description: string;
        price: number;
        image: string;
    };
};



export default function InventoryPage() {

    const {data:product} = useGetProductsQuery({page: 0, size: 10}) as {data: ProductResponse}
    const [createInventoryItem] = useCreateInventoryItemMutation()

    const {data:inventories,refetch} = useGetInventoryQuery({page: 0, size: 10}) as {data: InventoryResponse,refetch:()=>void}

    const availableProducts = product?.results || [];

    const inventory = inventories?.results || [];



    const [newStock, setNewStock] = useState<{ [key: string]: number }>({})
    const [newInventoryItem, setNewInventoryItem] = useState<{ productId: string, qty: number }>({ productId: "", qty: 0 })

    const handleStockChange = (id: string, value: string) => {
        setNewStock(prev => ({ ...prev, [id]: parseInt(value) || 0 }))
    }

    const updateStock = () => {

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setNewInventoryItem(prev => ({ ...prev, [name]: value }))
    }


    const addNewInventoryItem = () => {

        const selectedProduct = availableProducts.find(product => product.name === newInventoryItem.productId)

        try {
            createInventoryItem({ productName: selectedProduct?.name || "", qty: newInventoryItem.qty })
            refetch();
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Inventory Item</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="productId">Product</label>
                        <select
                            id="productId"
                            name="productId"
                            value={newInventoryItem.productId}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a product</option>
                            {availableProducts.map(product => (
                                <option key={product.uuid} value={product.name}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="qty">Quantity</label>
                        <Input
                            id="qty"
                            name="qty"
                            type="number"
                            placeholder="Quantity"
                            value={newInventoryItem.qty}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <Button onClick={addNewInventoryItem}>Add Inventory Item</Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Update Stock</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.uuid}>
                                <TableCell>
                                    <Image
                                        src={item.product.image || "/placeholder.svg"}
                                        alt={item.product.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md"
                                    />
                                </TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={newStock[item.uuid] || ""}
                                        onChange={(e) => handleStockChange(item.uuid, e.target.value)}
                                        className="w-20"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateStock()}
                                        disabled={!newStock[item.uuid]}
                                    >
                                        Update Stock
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