import Background from "./components/Background";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CodeTime from "./components/CodeTime";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { config, sectionEnabled } from "./data/config";

export default function App()
{
	return (
		<>
			{config.features.animatedBackground && <Background />}
			{config.features.customCursor && <Cursor />}
			{config.features.scrollProgress && <ScrollProgress />}
			<Nav />
			<main>
				<Hero />
				{sectionEnabled("about") && <About />}
				{sectionEnabled("skills") && <Skills />}
				{sectionEnabled("work") && <Projects />}
				{sectionEnabled("codetime") && <CodeTime />}
				{sectionEnabled("contact") && <Contact />}
			</main>
			<Footer />
		</>
	);
}
