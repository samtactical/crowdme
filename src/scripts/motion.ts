/**
 * Rörelse enligt DESIGN.md §6.
 *
 * Ambient loopande mikrorörelse ligger i CSS (bob, blink, dot-pulse,
 * marquee). Det enda som behöver JS är scroll-reveal, och den är
 * medvetet minimal: 700 ms opacity + 8 px lyft, en gång per element.
 *
 * Två regler:
 *  1. Ingenting döljs av CSS förrän `data-motion-ready` ligger på
 *     <html>, så en utebliven bundle lämnar en läsbar sida.
 *  2. `prefers-reduced-motion` kortsluter allt.
 */
export function initMotion(): void {
  const root = document.documentElement;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const targets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );
  if (!targets.length) return;

  root.setAttribute("data-motion-ready", "");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        // Syskon inom samma grupp trappas med 60 ms.
        const delay = Number(el.dataset.revealDelay ?? 0);
        window.setTimeout(() => el.setAttribute("data-shown", ""), delay);
        observer.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
  );

  // Trappan räknas per grupp så att kort i samma rad följer varandra.
  document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    group
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el, i) => (el.dataset.revealDelay = String(i * 60)));
  });

  targets.forEach((el) => observer.observe(el));

  /* Header byter yta när hero passerats. */
  const header = document.querySelector<HTMLElement>("[data-header]");
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (header && hero) {
    const sentinel = new IntersectionObserver(
      ([entry]) => header.toggleAttribute("data-scrolled", !entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    sentinel.observe(hero);
  }
}
