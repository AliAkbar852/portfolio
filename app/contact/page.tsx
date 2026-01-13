import { ContactForm } from "@/components/sections/contact/contact-form";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container px-4 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Get in Touch</h1>
                    <p className="text-xl text-muted-foreground">
                        Interested in working together? Fill out the form or send me an email. I&apos;m currently available for freelance projects.
                    </p>

                    <div className="space-y-6 pt-8">
                        <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="h-10 w-10 rounded-full bg-[var(--blob-1)]/20 flex items-center justify-center text-[var(--blob-1)]">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Email</div>
                                <a href="mailto:hello@aliakbar.dev" className="text-lg font-semibold hover:text-[var(--blob-1)] transition-colors">hello@aliakbar.dev</a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="h-10 w-10 rounded-full bg-[var(--blob-2)]/20 flex items-center justify-center text-[var(--blob-2)]">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Location</div>
                                <div className="text-lg font-semibold">Remote / Worldwide</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
