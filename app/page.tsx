import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Education from './_components/Education';
import Skills from './_components/Skills';
import Journey from './_components/Journey';
import ProjectList from './_components/ProjectList';
import OutsideWork from './_components/OutsideWork';
import { TestimonialCarousel } from '@/components/ui/profile-card-testimonial-carousel';
import SectionTitle from '@/components/SectionTitle';
import { Camera } from 'lucide-react';

const SHOW_JOURNEY_SECTION = false;

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <Education />
            <Experiences />
            <Skills />
            {SHOW_JOURNEY_SECTION ? <Journey /> : null}
            <section className="pb-section" id="snapshot">
                <div className="container">
                    <SectionTitle
                        title="CYRIL IN A SNAPSHOT"
                        icon={<Camera size={25} className="animate-pulse" />}
                    />
                    <TestimonialCarousel />
                </div>
            </section>
            <ProjectList />
            <OutsideWork />
        </div>
    );
}
