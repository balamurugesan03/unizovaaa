import { useState } from 'react'
import { useLenis } from './lib/useLenis'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import AICapabilities from './components/AICapabilities'
import WhatWeBuild from './components/WhatWeBuild'
import Industries from './components/Industries'
import TechStack from './components/TechStack'
import Process from './components/Process'
import CaseStudies from './components/CaseStudies'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  useLenis()
  const [ready, setReady] = useState(false)

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <AICapabilities />
        <WhatWeBuild />
        <Industries />
        <TechStack />
        <Process />
        <CaseStudies />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
