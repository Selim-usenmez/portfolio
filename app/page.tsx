import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import MobilePreview from '@/components/MobilePreview'
import TableauSynthese from '@/components/TableauSynthese'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <MobilePreview />
      <TableauSynthese />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
