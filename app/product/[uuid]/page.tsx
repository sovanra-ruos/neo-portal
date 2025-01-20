"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import { useGetInventoryByUuidQuery } from "@/redux/service/inventory"
import type { InventoryType } from "@/app/dashboard/inventory/page"



export default function ProductDetail() {
    const param = useParams()
    const uuid = Array.isArray(param?.uuid) ? param.uuid[0] : param?.uuid || ''
    const { data: product } = useGetInventoryByUuidQuery({ uuid }) as { data: InventoryType }
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Mocked additional product images
    const productImages = [
        product?.product?.image
    ]

    const features = [
        "High-quality materials for durability",
        "Ergonomic design for comfort",
        "Multiple color options available",
        "Energy-efficient operation",
        "Easy to clean and maintain",
    ]

    const specs = {
        Dimensions: '10" x 5" x 3"',
        Weight: "2.5 lbs",
        Material: "Aluminum and high-grade plastic",
        "Power Source": "Rechargeable Li-ion battery",
        Warranty: "2 years limited",
        "Country of Origin": "Made in USA",
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={productImages[currentImageIndex] || "/placeholder.svg"}
                                    alt={`${product?.product?.name} - Image ${currentImageIndex + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-all duration-300 hover:scale-105"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2"
                            onClick={handlePrevImage}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={handleNextImage}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex justify-center space-x-2">
                        {productImages.map((_, index) => (
                            <Button
                                key={index}
                                variant={index === currentImageIndex ? "default" : "outline"}
                                size="icon"
                                className="w-3 h-3 rounded-full p-0"
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product?.product?.name}</h1>
                    <div className="flex items-center space-x-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-5 h-5 ${
                                        star <= Math.round(5) ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">(1000 reviews)</span>
                    </div>
                    <p className="text-2xl font-bold">${product?.product?.price.toFixed(2)}</p>
                    <p className="text-gray-600">{product?.product?.description}</p>
                    <div className="flex space-x-4">
                        <Button className="flex-1">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="icon">
                            <Heart className="w-4 h-4" />
                            <span className="sr-only">Add to wishlist</span>
                        </Button>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Product Details:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>In stock: {product?.qty} units</li>
                            {/*<li>SKU: {product?.product?.sku}</li>*/}
                            {/*<li>Category: {product?.product?.category}</li>*/}
                        </ul>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="features" className="mt-12">
                <TabsList>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                </TabsList>
                <TabsContent value="features">
                    <Card className="p-6">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center space-x-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <svg
                                        className="w-5 h-5 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </Card>
                </TabsContent>
                <TabsContent value="specs">
                    <Card className="p-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            {Object.entries(specs).map(([key, value], index) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 p-3 rounded-md"
                                >
                                    <dt className="font-medium text-gray-500">{key}</dt>
                                    <dd className="mt-1 text-sm">{value}</dd>
                                </motion.div>
                            ))}
                        </dl>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

