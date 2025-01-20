"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from 'lucide-react'


interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "MSI Titan GT77 HX 13V-075US Gaming Laptop",
            price: 4999.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: "2",
            name: "MSI MEG Trident X2 13TH Gaming Desktop",
            price: 3999.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
        },
    ])

    const updateQuantity = (id: string, newQuantity: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        )
    }

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <section className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                <img src={item.image || "/placeholder.svg"} alt={item.name}
                                     className="w-20 h-20 object-cover"/>
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                                        className="w-16 text-center"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="bg-muted p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button className="w-full mt-4">Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

