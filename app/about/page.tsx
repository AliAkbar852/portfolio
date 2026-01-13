import { SITE_DATA } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container px-4 py-12 md:py-24">
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/3 relative">
                    <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 relative">
                        <Image
                            src="/profile.jpg"
                            alt="Ali Akbar"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Decorative blob behind */}
                    <div className="absolute -inset-4 bg-[var(--blob-1)] blur-[40px] opacity-20 -z-10 rounded-full" />
                </div>

                <div className="w-full md:w-2/3 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">About Me</h1>
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p>
                            I am a <strong>{SITE_DATA.personal.title}</strong> based in the digital realm. {SITE_DATA.personal.bio}
                        </p>
                        <p>
                            With a background in both design and engineering, I bridge the gap between aesthetics and functionality. I believe that motion and interactivity are not just embellishments but essential tools for storytelling and user guidance.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies, contributing to open source, or experimenting with generative art.
                        </p>
                    </div>

                    <div className="pt-8">
                        <h3 className="text-xl font-semibold mb-4">My Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {SITE_DATA.skills.map(skill => (
                                <Badge key={skill} variant="outline" className="text-base py-1 px-3">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="mt-24 space-y-12">
                <h2 className="text-3xl font-bold">Experience</h2>
                <div className="relative border-l border-white/10 ml-3 space-y-12">
                    {[
                        { year: "2023 - Present", role: "Senior Frontend Engineer", company: "Tech Corp", desc: "Leading the frontend team and rebuilding the core platform." },
                        { year: "2021 - 2023", role: "Creative Developer", company: "Agency Studio", desc: "Built award-winning sites for A-list clients." },
                        { year: "2019 - 2021", role: "Frontend Developer", company: "StartUp Inc", desc: "Implemented key features for the MVP." }
                    ].map((job, i) => (
                        <div key={i} className="relative pl-8">
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--blob-1)] ring-4 ring-background" />
                            <div className="space-y-1">
                                <span className="text-sm text-muted-foreground">{job.year}</span>
                                <h3 className="text-xl font-bold">{job.role}</h3>
                                <div className="text-lg text-[var(--blob-2)]">{job.company}</div>
                                <p className="text-muted-foreground">{job.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
