import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isInitialized = false;

export function initGSAP() {
  if (isInitialized) {
    console.warn('GSAP already initialized — skipping duplicate init');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  isInitialized = true;
  console.log('GSAP ScrollTrigger initialized');
}

export { gsap, ScrollTrigger };
