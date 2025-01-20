'use client';

import Link from "next/link"
import { Search, ShoppingCart } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ThemeToggle from "@/component/navbar/theme-toggle";
import {useGetCategoriesQuery} from "@/redux/service/category";
import {CategoryResponse} from "@/app/dashboard/categories/page";


export default function NavbarComponent() {

    const {data} = useGetCategoriesQuery({
        page: 1,
        size: 8
    }) as {data: CategoryResponse}

    const categories = data?.results || []

    console.log("navbar",categories)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                            <span className="text-xl font-bold">Neo</span>
                        </div>
                        <span className="text-xl font-bold">Tech</span>
                    </Link>

                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                                        <div className="grid grid-cols-2 gap-3">
                                            {categories.map((category, index) => (
                                                <Link key={index} href={`/category/${category.name}`} className="group grid h-full w-full items-center justify-center rounded-md bg-muted p-4 hover:bg-muted/70 transition-colors">
                                                    <div className="text-sm font-medium">{category.name}</div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/products" className="group grid h-full w-full items-center justify-center rounded-md bg-muted p-4 hover:bg-muted/70 transition-colors">
                                            <div className="text-sm font-medium">All Products</div>
                                        </Link>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/projects" legacyBehavior passHref>
                                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                        Projects
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/about" legacyBehavior passHref>
                                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                        About
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/dashboard" legacyBehavior passHref>
                                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                        Dashboard
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <div className="flex items-center space-x-4">
                                    <Link href="/login" legacyBehavior passHref>
                                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                            Login
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link href="/sign-up">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </div>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-4 flex-1 max-w-sm ml-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 w-full"
                            />
                        </div>
                        <ThemeToggle />
                        <Link href="/cart">
                            <Button variant="outline" size="icon">
                                <ShoppingCart className="h-4 w-4" />
                                <span className="sr-only">Shopping cart</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

