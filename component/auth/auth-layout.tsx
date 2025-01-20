interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    description?: string
    image?: string
}

export default function AuthLayout({ children, title, description, image = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UDkRjBMy2CGS2paMcqxF6ClD5CTnrC.png" }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="relative hidden md:block md:w-1/2 bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                <img
                    src={image || "/placeholder.svg"}
                    alt="Gaming Setup"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 flex items-center justify-center p-8 md:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        {description && (
                            <p className="text-muted-foreground">{description}</p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

