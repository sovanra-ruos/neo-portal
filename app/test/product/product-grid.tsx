"use client"

import { motion } from "framer-motion"

import {ProductCard} from "@/component/product/product-card";

type InventoryType = {
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

interface ProductGridProps {
    title: string
    products: InventoryType[]
}

export function ProductGrid({ title, products }: ProductGridProps) {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-8"
                >
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{title}</h2>
                        <div className="h-1 w-20 bg-primary rounded" />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        View All
                    </motion.button>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.uuid}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

