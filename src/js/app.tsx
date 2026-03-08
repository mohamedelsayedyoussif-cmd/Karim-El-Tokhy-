import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Preloader } from '../sections/preloader';
import { Navbar } from '../sections/navbar';
import { Hero } from '../sections/hero';
import { About } from '../sections/about';
import { Experience } from '../sections/experience';
import { Skills } from '../sections/skills';
import { Certifications } from '../sections/certifications';
import { CaseStudies } from '../sections/casestudies';
import { Awards } from '../sections/awards';
import { Testimonials } from '../sections/testimonials';
import { Contact } from '../sections/contact';
import { AIGeneration } from '../sections/aigeneration';
import { Blog } from '../sections/blog';
import { Downloads } from '../sections/downloads';
import { Footer } from '../sections/footer';

import { initScroll } from './scroll';
import { initCursor } from './cursor';
import { initAllInteractions } from './interactions';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const { setUser, isPreloaderDone } = useStore();

  useEffect(() => {
    const destroyScroll = initScroll();
    return () => destroyScroll();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (isPreloaderDone) {
      const destroyCursor = initCursor();
      let destroyInteractions: (() => void) | undefined;
      
      const timer = setTimeout(() => {
        destroyInteractions = initAllInteractions();
      }, 100);
      
      return () => {
        destroyCursor();
        clearTimeout(timer);
        if (destroyInteractions) destroyInteractions();
      };
    }
  }, [isPreloaderDone]);

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary-dark font-sans overflow-x-hidden">
      <Preloader />
      
      {isPreloaderDone && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Certifications />
            <CaseStudies />
            <Awards />
            <Testimonials />
            <AIGeneration />
            <Blog />
            <Downloads />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
