import { SITE_DATA } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="container px-4 py-12 md:py-24">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">My Services</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    I help brands and businesses stand out with immersive digital experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SITE_DATA.services.map((service, i) => (
                    <Card key={i} className="flex flex-col h-full bg-white/5 border-white/10 hover:border-[var(--blob-1)] transition-colors">
                        <CardHeader>
                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6">
                            <p className="text-muted-foreground">{service.description}</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[var(--blob-1)] mr-2" /> Custom Implementation</li>
                                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[var(--blob-1)] mr-2" /> Performance Optimized</li>
                                <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[var(--blob-1)] mr-2" /> Accessible Design</li>
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-24 bg-black/20 rounded-2xl p-8 md:p-12 text-center border border-white/10">
                <h2 className="text-3xl font-bold mb-4">Have a project in mind?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Regardless of the project size, I'm always interested in hearing about new ideas.
                </p>
                <Button size="lg" variant="neon" asChild>
                    <Link href="/contact">
                        Get in Touch <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
