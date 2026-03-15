import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Education from './_components/Education';
import Skills from './_components/Skills';
import SideQuest from './_components/SideQuest';
import ProjectList from './_components/ProjectList';
import OutsideWork from './_components/OutsideWork';

export default function Home() {
    return (
        <>
            <Banner />
            <AboutMe />
            <Experiences />
            <ProjectList />
            <Education />
            <Skills />
            <SideQuest />
            <OutsideWork />
        </>
    );
}
