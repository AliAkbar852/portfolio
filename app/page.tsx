import { Hero } from "@/components/sections/home/hero";
import { Skills } from "@/components/sections/home/skills";
import { FeaturedProjects } from "@/components/sections/home/featured-projects";
import { Services } from "@/components/sections/home/services";
import { Testimonials } from "@/components/sections/home/testimonials";
import { ContactCTA } from "@/components/sections/home/contact-cta";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Skills />
      <FeaturedProjects />
      <Services />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}
