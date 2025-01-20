'use client'
import {useParams} from "next/navigation";
import {useGetInventoryByCategoryNameQuery} from "@/redux/service/inventory";
import {InventoryType} from "@/app/dashboard/inventory/page";
import {Suspense} from "react";
import {ProductGrid} from "@/component/product/product-grid";

const CategoryPage = () => {
    const param = useParams()
    const categoryName = Array.isArray(param?.name) ? param.name[0] : param?.name || ''

    const {data} = useGetInventoryByCategoryNameQuery({categoryName}) as {data: InventoryType[]}

    const products = data ? data : []

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">All Products in {categoryName}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductGrid title="Our Products" products={products}/>
            </Suspense>
        </main>
    )
}

export default CategoryPage