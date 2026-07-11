import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateNavbar() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  gsap.from(nav, { y: -32, opacity: 0, duration: 0.7, ease: "power3.out" });
}

const NAV_SCROLLED_CLASSES = [
  "bg-surface-container-lowest/90",
  "backdrop-blur-md",
  "shadow-lg",
  "border-2",
  "border-primary/10",
  "py-2",
];
const NAV_TOP_CLASSES = ["py-4"];

/** Toggles a background + shadow on the sticky nav once the page scrolls past the hero's floating-pill look. */
function initStickyNavbar() {
  const inner = document.querySelector("[data-nav-inner]");
  if (!inner) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    if (scrolled) {
      inner.classList.remove(...NAV_TOP_CLASSES);
      inner.classList.add(...NAV_SCROLLED_CLASSES);
    } else {
      inner.classList.remove(...NAV_SCROLLED_CLASSES);
      inner.classList.add(...NAV_TOP_CLASSES);
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/** Working mobile nav: hamburger opens a dropdown panel, any link tap closes it. */
function initMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const icon = document.querySelector("[data-menu-icon]");
  if (!toggle || !menu || !icon) return;

  const closeMenu = () => {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    icon.textContent = "menu";
  };

  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    if (isOpen) {
      closeMenu();
      return;
    }
    menu.classList.remove("hidden");
    toggle.setAttribute("aria-expanded", "true");
    icon.textContent = "close";
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

/** Lightbox for the facility photo gallery, opened from the "Conoce Nuestras Instalaciones" button. */
function initGallery() {
  const modal = document.querySelector("[data-gallery]");
  const trigger = document.querySelector("[data-gallery-trigger]");
  const activeImage = document.querySelector("[data-gallery-active-image]");
  const counter = document.querySelector("[data-gallery-counter]");
  const thumbs = Array.from(document.querySelectorAll("[data-gallery-thumb]"));
  const closeBtn = document.querySelector("[data-gallery-close]");
  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");
  if (!modal || !trigger || !activeImage || !thumbs.length) return;

  const images = thumbs.map((thumb) => thumb.querySelector("img").src);
  let index = 0;

  const show = (i) => {
    index = (i + images.length) % images.length;
    activeImage.src = images[index];
    if (counter) counter.textContent = `${index + 1} / ${images.length}`;
    thumbs.forEach((thumb, ti) => {
      thumb.dataset.active = String(ti === index);
    });
  };

  const open = (startIndex) => {
    show(startIndex);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  trigger.addEventListener("click", () => open(0));
  closeBtn?.addEventListener("click", close);
  prevBtn?.addEventListener("click", () => show(index - 1));
  nextBtn?.addEventListener("click", () => show(index + 1));
  thumbs.forEach((thumb, i) => thumb.addEventListener("click", () => show(i)));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}

function animateHero() {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(hero.querySelectorAll("[data-hero-blob]"), {
    scale: 0.5,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
  })
    .from(
      hero.querySelector("[data-hero-title]"),
      { y: 36, opacity: 0, duration: 0.8 },
      "-=0.7",
    )
    .from(
      hero.querySelector("[data-hero-text]"),
      { y: 20, opacity: 0, duration: 0.6 },
      "-=0.45",
    )
    .from(
      hero.querySelector("[data-hero-cta]"),
      { y: 16, opacity: 0, duration: 0.5 },
      "-=0.35",
    )
    .from(
      hero.querySelector("[data-hero-image]"),
      { scale: 0.88, opacity: 0, rotate: 8, duration: 0.9 },
      "-=0.7",
    )
    .from(
      hero.querySelectorAll("[data-hero-sticker]"),
      { scale: 0, opacity: 0, duration: 0.55, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.45",
    );
}

/**
 * Depth parallax: as the hero scrolls out, the background blobs drift
 * slower than the foreground dog photo, separating the layers visually —
 * the same "layers move at different speeds" trick behind Apple's hero
 * sections.
 */
function initHeroParallax() {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;

  hero.querySelectorAll("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.3;
    gsap.to(el, {
      y: window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const image = hero.querySelector("[data-hero-image]");
  if (image) {
    gsap.to(image, {
      y: -70,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}

/**
 * Continuous slow rotation, GSAP-driven so it can coexist with other
 * transform tweens (parallax, float) on the same element without a CSS
 * keyframe animation fighting for the `transform` property.
 */
function initContinuousSpin() {
  document.querySelectorAll("[data-spin]").forEach((el) => {
    gsap.to(el, { rotation: 360, duration: 60, repeat: -1, ease: "none" });
  });
}

/** Gentle idle drift on decorative blobs that aren't part of a pinned sequence. */
function animateFloatingBlobs() {
  document.querySelectorAll("[data-float]").forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 === 0 ? "+=16" : "-=16",
      x: i % 3 === 0 ? "+=8" : "-=8",
      duration: 5 + (i % 3),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

/** Generic "fade + rise" on scroll for sections that don't have a bespoke sequence. */
function animateReveals() {
  const groups = document.querySelectorAll("[data-reveal-group]");

  groups.forEach((group) => {
    const items = group.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    gsap.set(items, { y: 44, opacity: 0 });

    ScrollTrigger.batch(items, {
      // "top bottom" (not "top 87%") needs the least extra scroll room below
      // the element to be reachable — critical for the last items on the
      // page (e.g. the footer credit), where a stricter threshold can sit
      // past the maximum possible scroll position and never fire normally.
      start: "top bottom",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
        }),
    });
  });
}

/**
 * A little paw-print runner sprints along a winding trail across the
 * Contact section — leaving a trail of paw prints behind it — and "becomes"
 * the WhatsApp button the instant it arrives, tied to scroll. Desktop/tablet
 * only: on narrow phones there isn't enough room for a route to feel like a
 * route, and it'd just be a distraction.
 */
function initWhatsAppRunner() {
  const section = document.querySelector("#contacto");
  const runner = section?.querySelector("[data-runner]");
  const bounceEl = runner?.querySelector("[data-runner-bounce]");
  const trailLayer = section?.querySelector("[data-runner-trail]");
  const button = section?.querySelector("[data-whatsapp-button]");
  if (!section || !runner || !bounceEl || !trailLayer || !button) return;

  const row = runner.parentElement;
  const rowRect = row.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();

  const start = { x: rowRect.width * 0.58, y: 24 };
  const mid1 = { x: rowRect.width * 0.95, y: rowRect.height * 0.22 };
  const mid2 = { x: rowRect.width * 0.5, y: rowRect.height * 0.6 };
  const end = {
    x: buttonRect.left - rowRect.left + buttonRect.width / 2,
    y: buttonRect.top - rowRect.top + buttonRect.height / 2,
  };
  const points = [start, mid1, mid2, end];

  const rawPath = MotionPathPlugin.arrayToRawPath(points, { curviness: 1.4 });
  MotionPathPlugin.cacheRawPathMeasurements(rawPath);

  trailLayer.innerHTML = "";
  const trailFractions = [0.14, 0.3, 0.46, 0.62, 0.78];
  const dots = trailFractions.map((fraction) => {
    const pos = MotionPathPlugin.getPositionOnPath(rawPath, fraction);
    const dot = document.createElement("span");
    dot.className = "material-symbols-outlined pointer-events-none absolute select-none text-primary/35";
    dot.style.fontSize = "15px";
    dot.style.left = `${pos.x}px`;
    dot.style.top = `${pos.y}px`;
    dot.style.transform = "translate(-50%, -50%) rotate(20deg)";
    dot.style.opacity = "0";
    dot.textContent = "pets";
    trailLayer.appendChild(dot);
    return dot;
  });

  gsap.set(runner, { x: start.x, y: start.y, opacity: 1 });
  gsap.set(button, { opacity: 0.3, scale: 0.55, transformOrigin: "50% 50%" });
  gsap.set(bounceEl, { transformOrigin: "50% 100%" });

  // Squash-and-stretch gallop cycle — a single static drawing read as genuine
  // running motion the way classic 2D animation fakes a run without frames:
  // alternating compress-at-ground / stretch-at-peak beats, fast tempo.
  gsap
    .timeline({ repeat: -1 })
    .to(bounceEl, { y: -11, scaleX: 0.86, scaleY: 1.16, rotate: -7, duration: 0.11, ease: "power1.out" })
    .to(bounceEl, { y: 0, scaleX: 1.14, scaleY: 0.84, rotate: 5, duration: 0.09, ease: "power1.in" })
    .to(bounceEl, { y: -9, scaleX: 0.88, scaleY: 1.14, rotate: -6, duration: 0.1, ease: "power1.out" })
    .to(bounceEl, { y: 0, scaleX: 1.12, scaleY: 0.86, rotate: 6, duration: 0.09, ease: "power1.in" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      end: "top 20%",
      scrub: 0.6,
    },
  });

  tl.to(
    runner,
    { motionPath: { path: points, curviness: 1.4 }, ease: "none", duration: 1 },
    0,
  );

  dots.forEach((dot, i) => {
    tl.to(dot, { opacity: 0.6, duration: 0.04 }, trailFractions[i]);
  });

  tl.to(runner, { opacity: 0, scale: 0.35, duration: 0.1, ease: "power1.in" }, 0.88).to(
    button,
    { opacity: 1, scale: 1, duration: 0.14, ease: "back.out(2)" },
    0.9,
  );
}

/** Smooth-scrolls nav links to their target section. */
function initNavLinks() {
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      const y = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}

function revealEverythingStatically() {
  document
    .querySelectorAll(
      "[data-reveal], [data-hero-title], [data-hero-text], [data-hero-cta], [data-hero-image], [data-hero-sticker], [data-hero-blob], [data-whatsapp-button], [data-runner]",
    )
    .forEach((el) => {
      gsap.set(el, { clearProps: "all" });
    });
}

function init() {
  initMobileMenu();
  initStickyNavbar();
  initGallery();

  if (prefersReducedMotion) {
    revealEverythingStatically();
    return;
  }

  animateNavbar();
  animateHero();
  initHeroParallax();
  initContinuousSpin();
  animateFloatingBlobs();
  animateReveals();
  initNavLinks();

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": initWhatsAppRunner,
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
