import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Education from './_components/Education';
import Skills from './_components/Skills';
import SideQuest from './_components/SideQuest';
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
            <Experiences />
            <ProjectList />
            <Education />
            <Skills />
            <SideQuest />
            <section className="pt-12 md:pt-20 pb-section" id="snapshot">
                <div className="container">
                    <SectionTitle
                        title="CYRIL IN A SNAPSHOT"
                        icon={<Camera size={25} className="animate-pulse" />}
                    />
                    <TestimonialCarousel />
                </div>
            </section>
            <OutsideWork />
        </div>
    );
}
