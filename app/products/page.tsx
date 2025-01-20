'use client'
import { Suspense } from 'react'

import {ProductGrid} from "@/component/product/product-grid";

import {useGetInventoryQuery} from "@/redux/service/inventory";
import {InventoryResponse} from "@/app/dashboard/inventory/page";

export default function ProductsPage() {

    const {data} = useGetInventoryQuery({page: 0, size: 10}) as {data: InventoryResponse}

    const products = data?.results || []

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">All Products</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductGrid title="Our Products" products={products}/>
            </Suspense>
        </main>
    )
}

