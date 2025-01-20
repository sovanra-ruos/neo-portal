
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function ProjectsPage() {
    const projects = [
        {
            title: "Custom PC Building",
            description: "We offer custom PC building services tailored to your specific needs and budget.",
        },
        {
            title: "Gaming Setup Consultation",
            description: "Our experts provide personalized advice to optimize your gaming environment.",
        },
        {
            title: "E-Sports Team Sponsorship",
            description: "We sponsor local e-sports teams, providing them with top-tier gaming equipment.",
        },
        {
            title: "Tech Workshops",
            description: "We host regular workshops on topics like overclocking, water cooling, and more.",
        },
    ]

    return (
            <section className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-6">Our Projects</h1>
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{project.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
    )
}

