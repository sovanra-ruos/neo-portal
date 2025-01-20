import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShoppingBag, List, Package, Settings, LogOut } from 'lucide-react'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-800">NeoTech Admin</h1>
                </div>
                <nav className="mt-4">
                    <Link href="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                        <LayoutDashboard className="inline-block w-5 h-5 mr-2" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/products" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                        <ShoppingBag className="inline-block w-5 h-5 mr-2" />
                        Products
                    </Link>
                    <Link href="/dashboard/categories" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                        <List className="inline-block w-5 h-5 mr-2" />
                        Categories
                    </Link>
                    <Link href="/dashboard/inventory" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                        <Package className="inline-block w-5 h-5 mr-2" />
                        Inventory
                    </Link>
                    <Link href="/dashboard/settings" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                        <Settings className="inline-block w-5 h-5 mr-2" />
                        Settings
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-64 p-4">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/logout">
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </Link>
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

