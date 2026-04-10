import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import MobilePreview from '@/components/MobilePreview'
import TableauSynthese from '@/components/TableauSynthese'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg overflow-hidden">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <MobilePreview />
      <TableauSynthese />
      <Contact />
      <Footer />
    </main>
  )
}
