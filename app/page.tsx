'use client'
import PromoBanner from "@/component/home/promo-banner";
import {ProductGrid} from "@/component/product/product-grid";
import {Categories} from "@/component/product/categories";
import {useGetInventoryQuery} from "@/redux/service/inventory";
import {InventoryResponse} from "@/app/dashboard/inventory/page";
import {useGetCategoriesQuery} from "@/redux/service/category";
import {CategoryResponse} from "@/app/dashboard/categories/page";

export default function Home() {

  const {data} = useGetInventoryQuery({page: 0, size: 10}) as {data: InventoryResponse}

  const {data:category} = useGetCategoriesQuery({page: 0, size: 4}) as unknown as {data: CategoryResponse}

  const newProducts = data?.results || []

  const categories = category?.results || []

  return (

        <section>
          <PromoBanner />
          <Categories categories={categories} />
          <ProductGrid title="New Arrivals" products={newProducts} />
          <ProductGrid title="Hot Products" products={newProducts} />
        </section>
  )
}

