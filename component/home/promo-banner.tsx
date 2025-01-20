"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import hero from "@/public/hero.png"
import Image from "next/image";

export default function PromoBanner() {
    return (
        <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
            <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                            Level Up Your <span className="text-primary">Gaming Experience</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                            Unleash the power of cutting-edge technology with our premium gaming gear.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button size="lg" className="text-lg">
                                Shop Now
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <Image
                            src={hero}
                            alt="Gaming Laptop"
                            className="w-full h-auto rounded-lg shadow-2xl"
                            width={500}
                            height={500}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
                    </motion.div>
                </div>
            </div>
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        </section>
    )
}

