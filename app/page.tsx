import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import OutsideWork from './_components/OutsideWork';
import { TestimonialCarousel } from '@/components/ui/profile-card-testimonial-carousel';
import SectionTitle from '@/components/SectionTitle';
import { Camera } from 'lucide-react';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <section className="pb-section">
                <div className="container">
                    <SectionTitle
                        title="CYRIL IN A SNAPSHOT"
                        icon={<Camera size={25} className="animate-pulse" />}
                    />
                    <TestimonialCarousel />
                </div>
            </section>
            <Skills />
            <Experiences />
            <ProjectList />
            <OutsideWork />
        </div>
    );
}
