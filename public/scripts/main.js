// sections
const about = document.getElementById("about");
const intro = document.getElementById("intro");

//buttons
const toggleBtn = document.getElementById("theme-toggle");
const arrow = document.getElementById("arrow");

//others
const html = document.documentElement;
const firstSection = document.querySelector(".h-screen");
const nav = document.getElementById("myNav");
const bgVideo = document.getElementById("bgVideo");

bgVideo.playbackRate = 0.5;

window.addEventListener('load', () => {
  document.body.classList.remove('loading');
});

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


window.addEventListener("scroll", () => {
  const scrolledPastVP = window.scrollY > window.innerHeight/4;
  if (scrolledPastVP) {
    nav.style.transform = "translateY(-100%)";
  } else {
    nav.style.transform = "translateY(0)";
  }
});


let lastScrollY = window.scrollY;

const observer = new IntersectionObserver(
  (entries) => {
    const scrollingDown = window.scrollY > lastScrollY;
    lastScrollY = window.scrollY;
    entries.forEach((entry) => {
      if (entry.isIntersecting && scrollingDown) {
        entry.target.classList.add("show");
      } else if (!entry.isIntersecting && !scrollingDown){
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});
document.querySelectorAll(".animate-globe").forEach((el) => {
  observer.observe(el);
});
document.querySelectorAll(".appearL-on-scroll").forEach((el) => {
  observer.observe(el);
});
document.querySelectorAll(".appearR-on-scroll").forEach((el) => {
  observer.observe(el);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > firstSection.offsetHeight * 0.4) {
    arrow.classList.add("show");
    arrow.classList.remove("hide");
  } else {
    arrow.classList.add("hide");
    arrow.classList.remove("show");
  }
});

function formReset(){
  document.getElementById('contact-form').reset();
}

localStorage.theme = localStorage.theme ?? "dark";

if (localStorage.theme === "dark") {
  toggleBtn.className = "fa-solid fa-sun fa-2xl text-yellow-400";
  html.classList.add("dark");
} else {
  toggleBtn.className = "fa-solid fa-moon fa-2xl text-blue-500";
  html.classList.remove("dark");
}

toggleBtn.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");
  localStorage.theme = isDark ? "dark" : "light";
  toggleBtn.className = isDark
    ? "fa-solid fa-sun fa-2xl text-yellow-400"
    : "fa-solid fa-moon fa-2xl text-blue-500";
});

window.addEventListener("pageshow", () => {
  setTimeout(() => window.scrollTo(0, 0), 0);
});

//navbar
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("toggle")
  const menu = document.getElementById("menu")

  if (!button || !menu) return;

  console.log(button.dataset.command);

  button.addEventListener("click", () => {
    console.log("clicked");
  });

  menu.classList.toggle("hidden");

  button.addEventListener("click", () => {
    const isHidden = menu.hasAttribute("hidden");
    if (isHidden) {
      menu.removeAttribute("hidden");
      button.setAttribute("aria-expanded", "true");
    } else {
      menu.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", "false");
    }
  });
});