// Script global de la página. Todas las referencias al DOM se validan porque
// este archivo también se carga en páginas sin estas secciones (ej. /enviado).
const arrow = document.getElementById("arrow");
const hero = document.getElementById("hero");
const nav = document.getElementById("myNav");
const bgVideo = document.getElementById("bgVideo");

if (bgVideo instanceof HTMLVideoElement) {
  bgVideo.playbackRate = 0.5;
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  // Respeta los links directos a una sección (ej. /#contact)
  if (!location.hash) setTimeout(() => window.scrollTo(0, 0), 0);
});

// Navbar y botón "volver arriba"
window.addEventListener(
  "scroll",
  () => {
    if (nav) {
      const scrolledPastVP = window.scrollY > window.innerHeight / 4;
      nav.style.transform = scrolledPastVP ? "translateY(-100%)" : "translateY(0)";
    }

    if (arrow && hero) {
      const showArrow = window.scrollY > hero.offsetHeight * 0.4;
      arrow.classList.toggle("show", showArrow);
      arrow.classList.toggle("hide", !showArrow);
    }
  },
  { passive: true }
);

// Animaciones al hacer scroll: el elemento aparece cuando entra en pantalla
// y se reinicia solo cuando vuelve a quedar por debajo del viewport, así la
// animación se repite al bajar pero nunca queda oculto contenido ya visible.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.3 }
);

document
  .querySelectorAll(
    ".animate-on-scroll, .animate-globe, .appearL-on-scroll, .appearR-on-scroll"
  )
  .forEach((el) => observer.observe(el));
