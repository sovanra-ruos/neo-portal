"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type InventoryType = {
    uuid: string
    qty: number
    product: {
        uuid: string
        name: string
        description: string
        price: number
        salePrice?: number
        image: string
    }
}

interface ProductCardProps {
    product: InventoryType
}

export function ProductCard({ product }: ProductCardProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [cart, setCart] = useState<InventoryType[]>([])

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCart(storedCart)
    }, [])

    const handleImageLoad = () => setIsLoading(false)
    const handleImageError = () => {
        setIsLoading(false)
        setIsError(true)
    }

    const addToCart = (product: InventoryType) => {
        const updatedCart = [...cart, product]
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const discountPercentage = product.product.salePrice
        ? Math.round((1 - product.product.salePrice / product.product.price) * 100)
        : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="overflow-hidden group h-full flex flex-col">
                <CardContent className="p-0 flex-grow">
                    <Link href={`/product/${product.uuid}`}>
                        <div className="relative aspect-square">
                            {isLoading && <Skeleton className="w-full h-full absolute inset-0" />}
                            {isError ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <AlertCircle className="w-12 h-12 text-gray-400" />
                                </div>
                            ) : (
                                <Image
                                    src={product.product.image || "/placeholder.svg"}
                                    alt={product.product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 group-hover:scale-110"
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            )}
                            {discountPercentage > 0 && (
                                <Badge className="absolute top-2 left-2 bg-red-500">{discountPercentage}% OFF</Badge>
                            )}
                            {product.qty <= 5 && product.qty > 0 && (
                                <Badge className="absolute bottom-2 left-2 bg-yellow-500">Only {product.qty} left</Badge>
                            )}
                            {product.qty === 0 && <Badge className="absolute bottom-2 left-2 bg-gray-500">Out of Stock</Badge>}
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                {product.product.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                {product.product.salePrice ? (
                                    <>
                                        <span className="text-lg font-bold text-red-500">${product.product.salePrice.toFixed(2)}</span>
                                        <span className="text-sm text-gray-500 line-through">${product.product.price.toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className="text-lg font-bold">${product.product.price.toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                    </Link>
                </CardContent>
                <CardFooter className="p-4 pt-0 gap-2">
                    <Button
                        className="w-full gap-2"
                        disabled={product.qty === 0}
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        {product.qty === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                    <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}