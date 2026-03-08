import Lenis from 'lenis';
import { gsap, ScrollTrigger, initGSAP } from './gsap-init';

export const initScroll = () => {
  initGSAP();
  
  const lenis = new Lenis({
    wrapper: document.body,
    content: document.documentElement,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  document.body.style.position = 'relative';
  ScrollTrigger.refresh(true);

  // @ts-ignore
  window.lenis = lenis;

  lenis.on('scroll', ScrollTrigger.update);
  
  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };
  
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
};
