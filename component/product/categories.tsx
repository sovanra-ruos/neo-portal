"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import {Category} from "@/lib/product";
import {useGetCategoriesQuery} from "@/redux/service/category";


interface CategoriesProps {
    categories: Category[]
}

export function Categories({ categories }: CategoriesProps) {

    const {data} = useGetCategoriesQuery({
        page: 1,
        size: 8
    })

    console.log("cate",data)

    return (
        <section className="py-12 bg-muted">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded" />
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.uuid}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/category/${category.name}`} className="block group">
                                <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="object-cover w-full h-full transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-lg font-semibold">Shop Now</span>
                                    </div>
                                </div>
                                <h3 className="text-center font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

