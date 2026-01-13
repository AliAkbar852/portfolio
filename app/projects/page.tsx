import { ProjectList } from "@/components/sections/projects/project-list";

export default function ProjectsPage() {
    return (
        <div className="container px-4 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">My Work</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    A diverse collection of projects ranging from web applications to interactive 3D experiences.
                </p>
            </div>
            <ProjectList />
        </div>
    );
}
