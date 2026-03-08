// ═══════════════════════════
// KARIM PORTFOLIO — interactions.js
// All button interactions & animations
// ═══════════════════════════

import { gsap, initGSAP } from './gsap-init';

initGSAP();

// Helper to get Lenis instance if available globally
const getLenis = () => window.lenis;

// 1. UTILITIES

export function createRipple(event, color = '#C9A84C') {
  let button = event.currentTarget;
  
  // Handle event delegation
  if (!button || button === document || button === window) {
    button = event.target.closest('.btn-ripple');
  }
  
  if (!button) return;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.backgroundColor = color;
  circle.style.transform = 'scale(0)';
  circle.style.opacity = '0.6';
  circle.style.pointerEvents = 'none';

  // Ensure button has relative positioning for absolute child
  const computedStyle = window.getComputedStyle(button);
  if (computedStyle.position === 'static') {
    button.style.position = 'relative';
  }
  
  // Ensure overflow hidden so ripple doesn't spill out
  if (computedStyle.overflow !== 'hidden') {
    button.style.overflow = 'hidden';
  }

  button.appendChild(circle);

  gsap.to(circle, {
    scale: 4,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => circle.remove()
  });
}

export function showToast(message, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-[10000] flex flex-col justify-center transform translate-y-20 opacity-0 overflow-hidden`;
  
  if (type === 'success') {
    toast.style.backgroundColor = '#141414';
    toast.style.color = '#C9A84C';
    toast.style.border = '1px solid #C9A84C';
  } else if (type === 'error') {
    toast.style.backgroundColor = '#141414';
    toast.style.color = '#EF4444';
    toast.style.border = '1px solid #EF4444';
  } else {
    toast.style.backgroundColor = '#141414';
    toast.style.color = '#F5F5F5';
    toast.style.border = '1px solid #333';
  }

  toast.innerHTML = `<span class="font-medium relative z-10">${message}</span>`;
  document.body.appendChild(toast);

  const progress = document.createElement('div');
  progress.style.position = 'absolute';
  progress.style.bottom = '0';
  progress.style.left = '0';
  progress.style.height = '3px';
  progress.style.backgroundColor = 'currentColor';
  progress.style.width = '100%';
  progress.style.opacity = '0.5';
  toast.appendChild(progress);

  gsap.to(toast, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' });
  gsap.to(progress, { width: '0%', duration: duration / 1000, ease: 'linear' });

  setTimeout(() => {
    gsap.to(toast, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => toast.remove()
    });
  }, duration);
}

export function openModal(title, content, options = {}) {
  const backdrop = document.createElement('div');
  backdrop.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0';
  
  const modal = document.createElement('div');
  modal.className = 'relative w-full max-w-2xl bg-[#0A0A0A] border border-[#C9A84C] rounded-2xl p-8 shadow-[0_0_50px_rgba(201,168,76,0.15)] transform scale-95 opacity-0';
  
  modal.innerHTML = `
    <button class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors modal-close">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <h3 class="text-3xl font-display font-bold text-[#C9A84C] mb-4">${title}</h3>
    <div class="text-gray-300 font-light leading-relaxed">${content}</div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const closeModal = () => {
    gsap.to([backdrop, modal], {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => backdrop.remove()
    });
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });

  gsap.to(backdrop, { opacity: 1, duration: 0.3 });
  gsap.to(modal, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 });
}

export function smoothScrollTo(targetSelector, offset = -80, duration = 1.2) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset, duration });
  } else {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
}

export function updateNavActive(sectionId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('nav-active', 'text-[#C9A84C]');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('nav-active', 'text-[#C9A84C]');
    }
  });
}

export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('Could not save preference', e);
  }
}

// 2. NAVIGATION BUTTONS

function initNavigation() {
  const cleanupFns = [];

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const handler = (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      smoothScrollTo(targetId, -80);
      
      const mobileMenu = document.querySelector('#mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        document.querySelector('#hamburger-btn')?.click();
      }

      if (targetId === '#contact') {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          gsap.fromTo(contactSection, 
            { boxShadow: 'inset 0 0 0 rgba(201,168,76,0)' },
            { boxShadow: 'inset 0 0 50px rgba(201,168,76,0.2)', duration: 1, yoyo: true, repeat: 1 }
          );
        }
      }
    };
    link.addEventListener('click', handler);
    cleanupFns.push(() => link.removeEventListener('click', handler));
  });

  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateNavActive(entry.target.id);
      }
    });
  }, { rootMargin: '-20% 0px -80% 0px' });

  sections.forEach(section => observer.observe(section));
  cleanupFns.push(() => observer.disconnect());

  const hamburgerBtn = document.querySelector('#hamburger-btn');
  const mobileMenu = document.querySelector('#mobile-menu');
  const menuOverlay = document.querySelector('#menu-overlay');

  if (hamburgerBtn && mobileMenu && menuOverlay) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        gsap.to(mobileMenu, { x: '100%', duration: 0.4, ease: 'power2.out' });
        gsap.to(menuOverlay, { opacity: 0, duration: 0.4, onComplete: () => menuOverlay.style.display = 'none' });
        document.body.style.overflow = '';
        mobileMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '☰';
      } else {
        menuOverlay.style.display = 'block';
        gsap.to(menuOverlay, { opacity: 1, duration: 0.4 });
        gsap.to(mobileMenu, { x: '0%', duration: 0.4, ease: 'power2.out' });
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.add('open');
        hamburgerBtn.innerHTML = '✕';
      }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    cleanupFns.push(() => {
      hamburgerBtn.removeEventListener('click', toggleMenu);
      menuOverlay.removeEventListener('click', toggleMenu);
    });
  }

  return () => cleanupFns.forEach(fn => fn());
}

// 3. HERO BUTTONS

function initHeroButtons() {
  const cleanupFns = [];

  const btnViewWork = document.querySelector('#btn-view-work');
  if (btnViewWork) {
    const handler = (e) => {
      e.preventDefault();
      smoothScrollTo('#case-studies', -80, 1.2);
    };
    btnViewWork.addEventListener('click', handler);
    cleanupFns.push(() => btnViewWork.removeEventListener('click', handler));
  }

  const btnDownloadCV = document.querySelector('#btn-download-cv');
  if (btnDownloadCV) {
    const handler = (e) => {
      e.preventDefault();
      const btn = e.currentTarget;
      const contentSpan = btn.querySelector('.btn-content');
      
      if (contentSpan) {
        const originalText = contentSpan.innerHTML;
        contentSpan.innerHTML = '<span class="animate-spin inline-block mr-2">↻</span> Loading...';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
          contentSpan.innerHTML = originalText;
          btn.style.pointerEvents = 'auto';
          
          const link = document.createElement('a');
          link.href = '/assets/downloads/Karim-ElTokhy-CV.pdf';
          link.download = 'Karim-ElTokhy-CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          showToast('CV Downloaded Successfully ✓', 'success');
          console.log('CV_DOWNLOAD triggered');
        }, 800);
      } else {
        // Fallback if span not found (though it should be there)
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="animate-spin inline-block mr-2">↻</span> Loading...';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.pointerEvents = 'auto';
          // ... rest of logic
          const link = document.createElement('a');
          link.href = '/assets/downloads/Karim-ElTokhy-CV.pdf';
          link.download = 'Karim-ElTokhy-CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          showToast('CV Downloaded Successfully ✓', 'success');
        }, 800);
      }
    };
    btnDownloadCV.addEventListener('click', handler);
    cleanupFns.push(() => btnDownloadCV.removeEventListener('click', handler));
  }

  const btnMediaKit = document.querySelector('#btn-media-kit');
  if (btnMediaKit) {
    const handler = (e) => {
      e.preventDefault();
      const btn = e.currentTarget;
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="animate-spin inline-block mr-2">↻</span> Loading...';
      btn.style.pointerEvents = 'none';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
        
        const link = document.createElement('a');
        link.href = '/assets/downloads/Karim-ElTokhy-MediaKit.pdf';
        link.download = 'Karim-ElTokhy-MediaKit.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Media Kit Downloaded ✓', 'success');
      }, 800);
    };
    btnMediaKit.addEventListener('click', handler);
    cleanupFns.push(() => btnMediaKit.removeEventListener('click', handler));
  }

  return () => cleanupFns.forEach(fn => fn());
}

// 4. TIMELINE INTERACTIONS

// Timeline interactions are handled by React in experience.tsx

// 5. SKILLS INTERACTIONS

// Skills interactions are handled by React Three Fiber in skills.tsx

// 6. CERTIFICATIONS FLIP

// Certifications are handled by React in certifications.tsx

// 7. CASE STUDIES

// Case studies are handled by React in casestudies.tsx

// 8. AWARDS INTERACTIONS

// Awards are handled by React in awards.tsx

// 9. TESTIMONIALS SLIDER

// Testimonials slider is handled by React in testimonials.tsx

// 10. CONTACT FORM

// Contact form is handled by React in contact.tsx

// 11. SOCIAL & MISC

function initMisc() {
  const cleanupFns = [];

  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    const enterHandler = () => {
      gsap.to(icon, { scale: 1.2, color: '#C9A84C', duration: 0.3 });
    };
    const leaveHandler = () => {
      gsap.to(icon, { scale: 1, color: '#8A8A8A', duration: 0.3 });
    };
    icon.addEventListener('mouseenter', enterHandler);
    icon.addEventListener('mouseleave', leaveHandler);
    cleanupFns.push(() => {
      icon.removeEventListener('mouseenter', enterHandler);
      icon.removeEventListener('mouseleave', leaveHandler);
    });
  });

  const btnCopyEmail = document.querySelector('#btn-copy-email');
  if (btnCopyEmail) {
    const handler = () => {
      navigator.clipboard.writeText('karim.tokhy@outlook.com');
      const originalHtml = btnCopyEmail.innerHTML;
      btnCopyEmail.innerHTML = '✓';
      showToast('Email copied to clipboard ✓', 'success');
      setTimeout(() => {
        btnCopyEmail.innerHTML = originalHtml;
      }, 2000);
    };
    btnCopyEmail.addEventListener('click', handler);
    cleanupFns.push(() => btnCopyEmail.removeEventListener('click', handler));
  }

  const btnBackTop = document.querySelector('#btn-back-top');
  if (btnBackTop) {
    const scrollHandler = () => {
      if (window.scrollY > 500) {
        gsap.to(btnBackTop, { opacity: 1, scale: 1, duration: 0.3 });
        btnBackTop.style.pointerEvents = 'auto';
      } else {
        gsap.to(btnBackTop, { opacity: 0, scale: 0, duration: 0.3 });
        btnBackTop.style.pointerEvents = 'none';
      }
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    cleanupFns.push(() => window.removeEventListener('scroll', scrollHandler));

    const clickHandler = () => {
      smoothScrollTo('body', 0, 1.5);
    };
    btnBackTop.addEventListener('click', clickHandler);
    cleanupFns.push(() => btnBackTop.removeEventListener('click', clickHandler));
  }

  const blogBtns = document.querySelectorAll('.btn-read-more');
  blogBtns.forEach(btn => {
    const handler = () => {
      openModal('Blog Post', '<p>Full article content loads here...</p>');
    };
    btn.addEventListener('click', handler);
    cleanupFns.push(() => btn.removeEventListener('click', handler));
  });

  return () => cleanupFns.forEach(fn => fn());
}

// 12. EASTER EGG

function initEasterEgg() {
  const sequence = ['K', 'A', 'R', 'I', 'M'];
  let currentIndex = 0;

  function triggerEasterEgg() {
    const audio = new Audio('/assets/chime.mp3');
    audio.play().catch(e => console.warn('Audio play blocked by browser policy:', e));

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md opacity-0';
    overlay.innerHTML = `
      <h1 class="text-6xl md:text-9xl font-display font-bold text-[#C9A84C] mb-8 tracking-widest">KARIM</h1>
      <div class="text-center text-white space-y-4 text-xl font-light">
        <p>🎨 You found the secret!</p>
        <p>Welcome to Karim's hidden corner.</p>
        <p class="text-[#C9A84C] font-bold mt-8">Here's a special 10% discount code: KARIM10</p>
      </div>
    `;
    document.body.appendChild(overlay);

    gsap.to(overlay, { opacity: 1, duration: 1 });

    setTimeout(() => {
      gsap.to(overlay, { opacity: 0, duration: 1, onComplete: () => overlay.remove() });
    }, 5000);
  }

  const handler = (e) => {
    if (e.key.toUpperCase() === sequence[currentIndex]) {
      currentIndex++;
      if (currentIndex === sequence.length) {
        triggerEasterEgg();
        currentIndex = 0;
      }
    } else {
      currentIndex = 0;
    }
  };

  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}

// 13. RIPPLE EFFECT

function initRippleEffect() {
  const handler = (e) => {
    // createRipple now handles finding the closest .btn-ripple internally
    createRipple(e);
  };
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}

// 14. INIT — Exported for React

export function initAllInteractions() {
  try {
    const cleanupFns = [];
    cleanupFns.push(initNavigation());
    cleanupFns.push(initHeroButtons());
    cleanupFns.push(initMisc());
    cleanupFns.push(initEasterEgg());
    cleanupFns.push(initRippleEffect());
    console.log('Interactions initialized successfully.');
    
    return () => {
      cleanupFns.forEach(fn => fn && fn());
      console.log('Interactions cleaned up.');
    };
  } catch (error) {
    console.error('Error initializing interactions:', error);
    return () => {};
  }
}
