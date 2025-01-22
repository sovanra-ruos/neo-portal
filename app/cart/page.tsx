"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from 'lucide-react'

type CartItem = {
    uuid: string
    product: {
        id: number
        name: string
        price: number
        image: string
    }
    qty: number
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartItems))
        }
    }, [cartItems])

    const updateQuantity = (uuid: string, newQuantity: number) => {
        setCartItems(items =>
            items.map(item =>
                item.uuid === uuid ? { ...item, qty: Math.max(1, newQuantity) } : item
            )
        )
    }

    const removeItem = (uuid: string) => {
        setCartItems(items => {
            const updatedItems = items.filter(item => item.uuid !== uuid)
            localStorage.setItem('cart', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0)

    return (
        <section className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.uuid} className="flex items-center space-x-4 border-b pb-4">
                                <img src={item.product.image || "/placeholder.svg"} alt={item.product.name}
                                     className="w-20 h-20 object-cover"/>
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.product.name}</h3>
                                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.uuid, item.qty - 1)}
                                    >
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <Input
                                        type="number"
                                        value={item.qty}
                                        onChange={e => updateQuantity(item.uuid, parseInt(e.target.value))}
                                        className="w-16 text-center"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.uuid, item.qty + 1)}
                                    >
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.uuid)}>
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