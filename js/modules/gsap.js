// Basic GSAP animations module
export function initGSAP() {
  // Ensure gsap is available (loaded via script tags in HTML)
  if (typeof window === 'undefined' || !window.gsap) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger || (window.gsap && window.gsap.ScrollTrigger);
  if (ScrollTrigger) {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
      // plugin may already be registered
    }
  }

  // Hero logo: fade/slide from top
  gsap.from('.hero-logo', {    
    scrollTrigger: {
      trigger: ".hero-logo",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: -40,
    duration: 2,
    ease: 'power3.out',
  });

  // Hero date / intro
  gsap.from('.hero-date-con, .hero-intro h4', {    
    scrollTrigger: {
      trigger: ".hero-date",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    stagger: .35,
  });

  // Details items: stagger in when section enters viewport
  if (ScrollTrigger) {
    gsap.from('.details-item', {
      scrollTrigger: {
        trigger: '.details-item',
         toggleActions: "play none none reset",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2,
    });
  } else {
    gsap.from('.details-item', {    
    scrollTrigger: {
      trigger: ".details-item",
      toggleActions: "play none none reset",
    },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
    });
  }

  // RSVP container: reveal
  gsap.from('.rsvp-con', {    
    scrollTrigger: {
      trigger: ".rsvp-con",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',

  });

  gsap.from('.gallery-pic', {    
    scrollTrigger: {
      trigger: ".gallery-items",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3,

  });

    gsap.from('.gifts-con img, .gifts-con h4', {    
    scrollTrigger: {
      trigger: ".gifts-con",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',

  });

      gsap.from('.gifts-con p', {    
    scrollTrigger: {
      trigger: ".gifts-con",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    delay: 0.15,
    stagger: .15,

  });

  gsap.from('.faq-item', {    
    scrollTrigger: {
      trigger: ".faq-item",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    x: -20,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.3,

  });


      gsap.from('.gift', {
    scrollTrigger: {
      trigger: ".gift",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    stagger: .15,
  });
  }

export default initGSAP;
