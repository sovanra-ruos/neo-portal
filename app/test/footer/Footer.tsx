import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                <span className="text-xl font-bold">Neo</span>
                            </div>
                            <span className="text-xl font-bold">Tech</span>
                        </Link>
                        <p className="text-muted-foreground">
                            Your one-stop shop for premium gaming gear and cutting-edge technology.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="/category/laptops" className="text-muted-foreground hover:text-primary transition-colors">Gaming Laptops</Link></li>
                            <li><Link href="/category/desktops" className="text-muted-foreground hover:text-primary transition-colors">Gaming Desktops</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Information</Link></li>
                            <li><Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-6 w-6" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-6 w-6" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-6 w-6" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="submit"
                                    className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
                    <p>&copy; 2023 NeoTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

