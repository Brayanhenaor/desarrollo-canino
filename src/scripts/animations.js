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
      hero.querySelector("[data-hero-badge]"),
      { y: -16, opacity: 0, duration: 0.6 },
      "-=0.7",
    )
    .from(
      hero.querySelector("[data-hero-title]"),
      { y: 36, opacity: 0, duration: 0.8 },
      "-=0.35",
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
      start: "top 87%",
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
 * "El Entorno Perfecto" pins while the facility photo grows from a modest
 * sticker-blob into a near full-bleed frame and its blob corners relax
 * into softer rounded ones — the classic Apple product-reveal beat —
 * before the copy fades in.
 */
function initFacilityGrow() {
  const section = document.querySelector("#metodologia");
  const imageWrap = section?.querySelector("[data-facility-image]");
  const content = section?.querySelectorAll("[data-facility-content]");
  if (!section || !imageWrap || !content?.length) return;

  const blobEls = imageWrap.querySelectorAll(".blob-shape-2");

  gsap.set(imageWrap, { scale: 0.82, rotate: -5, transformOrigin: "50% 50%" });
  // Never fully invisible: a direct nav-link jump (or a fast flick past the
  // trigger start) should never land on blank copy, only dimmed copy.
  gsap.set(content, { opacity: 0.45, y: 18 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=100%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  tl.to(imageWrap, { scale: 1.1, rotate: 0, ease: "none", duration: 0.6 }, 0)
    .to(blobEls, { borderRadius: "24% 24% 24% 24% / 24% 24% 24% 24%", ease: "none", duration: 0.6 }, 0)
    .to(content, { opacity: 1, y: 0, ease: "none", stagger: 0.12, duration: 0.4 }, 0.55);
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

/**
 * Nav links must land on the section looking finished, not mid-scrub. For
 * any target that's pinned (currently just "El Entorno Perfecto"), jump
 * straight to the point where its pin releases — the fully-grown, fully-
 * revealed state — instead of the section's raw top (the empty/dim start
 * of the pin).
 */
function initNavLinks() {
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();

      const pinnedTrigger = ScrollTrigger.getAll().find(
        (st) => st.trigger === target && st.vars.pin,
      );
      const y = pinnedTrigger
        ? pinnedTrigger.end - 1
        : target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}

function revealEverythingStatically() {
  document
    .querySelectorAll(
      "[data-reveal], [data-hero-badge], [data-hero-title], [data-hero-text], [data-hero-cta], [data-hero-image], [data-hero-sticker], [data-hero-blob], [data-facility-content], [data-facility-image], [data-whatsapp-button], [data-runner]",
    )
    .forEach((el) => {
      gsap.set(el, { clearProps: "all" });
    });
}

function init() {
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
  initFacilityGrow();
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
